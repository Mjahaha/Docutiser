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
    return "True" in answer


def process_document(file_path, requirements, file_name):
    """
    Process the document with the given requirements.
    
    Args:
        file_path (str): Path to the uploaded file
        requirements (list): List of requirement strings
        file_name (str): Original name of the uploaded file
    
    Returns:
        str: Processing results
    """
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            return f"Error: File not found at {file_path}"
        
        # Basic file info
        results = []
        
        # Process each requirement
        for i, requirement in enumerate(requirements, 1):
            
            results.append(f"{i}. {requirement}")
            with open(file_name, 'r') as file:
                document_content = file.read()
            is_requirement_met = check_for_requirement(document_content, requirement)
            results.append(is_requirement_met)
        
        return "\n".join(results)
        
    except Exception as e:
        return f"Error processing document: {str(e)}"

def main():
    if len(sys.argv) != 4:
        print("Error: Expected 3 arguments")
        print("Usage: python process_document.py <file_path> <requirements_json> <file_name>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    requirements_json = sys.argv[2]
    file_name = sys.argv[3]
    
    try:
        requirements = json.loads(requirements_json)
    except json.JSONDecodeError as e:
        print(f"Error parsing requirements JSON: {e}")
        sys.exit(1)
    
    result = process_document(file_path, requirements, file_name)
    print(result)

if __name__ == "__main__":
    main()