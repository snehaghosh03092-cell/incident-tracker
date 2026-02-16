from faker import Faker
import random
from app import create_app, db
from app.models import Incident

fake = Faker()

SEVERITIES = ["SEV1", "SEV2", "SEV3", "SEV4"]
STATUSES = ["OPEN", "CLOSED", "RESOLVED"]

SERVICES = [
    "Auth Service",
    "Payment Gateway",
    "User Service",
    "Notification Service",
    "Search Service",
    "Database",
    "API Gateway"
]

def seed_data():
    app = create_app()

    with app.app_context():
        print("Seeding database...")

        for _ in range(200):
            incident = Incident(
                title=fake.sentence(nb_words=4),
                service=random.choice(SERVICES),
                severity=random.choice(SEVERITIES),
                status=random.choice(STATUSES),
                owner=fake.name(),
                summary=fake.paragraph(nb_sentences=3)
            )

            db.session.add(incident)

        db.session.commit()
        print("200 incidents inserted successfully!")

if __name__ == "__main__":
    seed_data()