from dotenv import load_dotenv

from backend.app import create_app


load_dotenv()

app = create_app()

HOST = "0.0.0.0"
PORT = "8080"


app.logger.info(f"Application started on {HOST}:{PORT}")
app.run(host=HOST, port=PORT, debug=True)
