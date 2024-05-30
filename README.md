A backend project written in node.js that uses the OpenAI ChatGPT API. \
This project allows us to upload our own personal documents and have ChatGPT answer any pertinent question concerning the document. \
To increase the speed of the response from ChatGPT we first convert the text into a vector, which is stored in a vector database-postgres w/vector add-on. \
In my case I chose to run the vector database in a Docker container so that the database will be able to be ran on different operating systems without any issues. \
The project is currenty being hosted on an Amazon Ec2 instance: https://chatgptapp.tonymdesigns.com/ 