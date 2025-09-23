import sys
import json
import os
from inspect_ai.model import get_model

PROMPT_TEMPLATE = """
Analyze the following document and determine if it meets each of the specified requirements.

Document: {document}

Requirements: 
{requirements}

Think step by step, then for each requirement, write Requirement N: True or Requirement N: False, where N is the requirement number."""


async def check_for_requirements(document: str, requirements: list[str]) -> dict[str, bool]:
    model = get_model(model=os.getenv("INSPECT_EVAL_MODEL"), api_key=os.getenv("GOOGLE_API_KEY"))
    requirements_text = "\n".join([f"{i+1}. {req}" for i, req in enumerate(requirements)])
    prompt = PROMPT_TEMPLATE.format(document=document, requirements=requirements_text)
    result = await model.generate(prompt)
    answer = result.completion
    results = {}
    for i, req in enumerate(requirements):
        if f"Requirement {i+1}: True" in answer:
            results[req] = True
        elif f"Requirement {i+1}: False" in answer:
            results[req] = False
        else: # TODO: Figure out what to do if the model doesn't answer correctly.
            raise Exception(f"Could not determine result for requirement {i+1}")
    return results


async def use_ai_to_assess_document_against_requirements(file_path: str, requirements: list[str], num_requirements: int = 1) -> dict[str, bool]:
    """Process the document with the given requirements.
    
    Args:
        file_path (str): Path to the uploaded file
        requirements (list): List of requirements to check against the document
    
    Returns:
        results (dict[str, bool]): Dictionary of requirement names to boolean values indicating if each requirement is met.
    """
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            return f"Error: File not found at {file_path}"
        
        # Basic file info
        results = {}

        # Process each set of requirements
        for i in range(0, len(requirements), num_requirements):
            with open(file_path, 'r') as file:
                document_content = file.read()
            are_requirements_met = await check_for_requirements(document_content, requirements[i:i+num_requirements])
            results.update(are_requirements_met)

        return results
        
    except Exception as e:
        return f"Error processing document: {str(e)}"



async def main():
    '''Validate system inputs and run the function to assess the requirements

    Returns:
        It prints the results to be captured by the stdout of the calling process, meaning its returned to the route handler
    '''

    # Validate and store system inputs 
    if len(sys.argv) != 3:
        print("Error: Expected 2 arguments")
        print("Usage: python process_document.py <file_path> <requirements_json>")
        sys.exit(1)
    file_path = sys.argv[1]
    requirements_json = sys.argv[2]

    # Parse requirements JSON
    try:
        requirements = json.loads(requirements_json)
    except json.JSONDecodeError as e:
        print(f"Error parsing requirements JSON: {e}")
        sys.exit(1)
    
    # Call the function to assess the document
    result = await use_ai_to_assess_document_against_requirements(file_path, requirements, 5)
    # Printing returns the result to the route handler
    print(result)


# This function runs this whole bad boy
if __name__ == "__main__":
    import asyncio
    asyncio.run(main())