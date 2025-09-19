import sys
import json
import os
from inspect_ai.model import get_model

PROMPT_TEMPLATE = """
Analyze the following document and determine if it meets the specified requirement.

Document: {document}

Requirement: {requirement}

Think step by step, then finish your answer with ANSWER: True or ANSWER: False."""

async def check_for_requirement(document: str, requirement: str) -> bool:
    model = get_model(model=os.getenv("INSPECT_EVAL_MODEL"), api_key=os.getenv("GOOGLE_API_KEY"))
    result = await model.generate(PROMPT_TEMPLATE.format(document=document, requirement=requirement))
    answer = result.completion
    return answer.strip().endswith("ANSWER: True")


async def use_ai_to_assess_document_against_requirements(file_path, requirements):
    """Process the document with the given requirements.
    
    Args:
        file_path (str): Path to the uploaded file
        requirements (list): List of requirements to check against the document
    
    Returns:
        str: Processing results
    """
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            return f"Error: File not found at {file_path}"
        
        # Basic file info
        results = {}
        
        # Process each requirement
        for requirement in requirements:
            with open(file_path, 'r') as file:
                document_content = file.read()
            is_requirement_met = await check_for_requirement(document_content, requirement)
            results[requirement] = is_requirement_met
        
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
    result = await use_ai_to_assess_document_against_requirements(file_path, requirements)
    # Printing returns the result to the route handler
    print(result)


# This function runs this whole bad boy
if __name__ == "__main__":
    import asyncio
    asyncio.run(main())