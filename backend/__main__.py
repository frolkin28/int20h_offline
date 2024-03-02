from dotenv import load_dotenv

from backend.app import create_app


load_dotenv()

app = create_app()

app.run(host="0.0.0.0", port="8080", debug=True)
