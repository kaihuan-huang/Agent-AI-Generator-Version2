import requests
from flask import Flask,render_template, request, jsonify
import openai

# Initialize the Flask app
app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])
def index(): 
    return render_template('index.html')
    
# Define the endpoint for fetching data from the RESO API
@app.route("/property/", methods=["GET","POST"])
def fetch_property_data():
    
    if request.method == "POST":
        print(request.form['code'])
        
    
    
    # Get the listing ID from the request
    listing_id = request.args.get("listing_id")
    # listing_id = request.form['address']
    print(listing_id)
   
    # Make the GET request to the attomdat API
    endpoint = 'https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address'
    
    headers = {
    'Accept': 'application/json', # specifying that the response should be in JSON format
    'apikey': '2b1e86b638620bf2404521e6e9e1b19e'
    }
    
    params = {
        "listingid": listing_id,
        # the geographic area of the property
        "postalcode":request.form['code'], 
        'minBeds': 1,
        'maxBeds': 2
    }
    
    response = requests.get(endpoint, headers=headers, params=params,verify=False)
    data = response.json()

    # Return the data
    return jsonify(data)
    
    

# Define the endpoint for generating post content using GPT-3
@app.route("/generate/", methods=["POST"])
def generate_content():
    # Get the input from the request
    input_text = request.json["input_text"]

    # Use openai_secret_manager to fetch the API key
    import openai_secret_manager
    secrets = openai_secret_manager.get_secrets("openai")
    openai.api_key = secrets["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"]

    # Use GPT-3 to generate post content
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"{input_text}",
        temperature=0.8,
    )
    post_content = response["choices"][0]["text"]

    # Return the generated content
    return jsonify(post_content)

# if __name__ == "__main__":
#     app.run(debug=True, port='9000')
if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8888', debug=True)

    
## have defined two endpoints in the Flask app, one for fetching data from the RESO API and another one for generating post content using GPT-3. The first endpoint is a GET request to the "/property" endpoint, which is using the listing ID passed as a query parameter to fetch data from the RESO API, it then returns the data in a JSON format.
## The second endpoint is a POST request to the "/generate" endpoint, which takes the input from the user and uses GPT-3 to generate post content, the post content is returned in a JSON format.
