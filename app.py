import requests
from flask import Flask, request, jsonify

# Initialize the Flask app
app = Flask(__name__)

# Define the endpoint for fetching data from the RESO API
@app.route("/property", methods=["GET"])
def fetch_property_data():
    # Get the listing ID from the request
    listing_id = request.args.get("listing_id")

    # Make the GET request to the RESO API
    endpoint = "https://api.reso.org/property"
    params = {
        "listingid": listing_id
    }
    response = requests.get(endpoint, params=params)
    data = response.json()

    # Return the data
    return jsonify(data)

# Define the endpoint for generating post content using GPT-3
@app.route("/generate", methods=["POST"])
def generate_content():
    # Get the input from the request
    input_text = request.json["input_text"]

    # Use openai_secret_manager to fetch the API key
    import openai_secret_manager
    secrets = openai_secret_manager.get_secrets("openai")
    openai.api_key = secrets["api_key"]

    # Use GPT-3 to generate post content
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"{input_text}",
        temperature=0.8,
    )
    post_content = response["choices"][0]["text"]

    # Return the generated content
    return jsonify(post_content)

if __name__ == "__main__":
    app.run(debug=True)
    
## have defined two endpoints in the Flask app, one for fetching data from the RESO API and another one for generating post content using GPT-3. The first endpoint is a GET request to the "/property" endpoint, which is using the listing ID passed as a query parameter to fetch data from the RESO API, it then returns the data in a JSON format.
## The second endpoint is a POST request to the "/generate" endpoint, which takes the input from the user and uses GPT-3 to generate post content, the post content is returned in a JSON format.
