from utils.db import db
from models.gear_type import Gear_Type

MEDIUM = "Medium"
SMALL = "Small"
LARGE = "Large"

default_types = [
    {"type": "Guitar", "size": MEDIUM},
    {"type": "Acoustic Guitar", "size": MEDIUM},
    {"type": "Bass", "size": MEDIUM},
    {"type": "Acoustic Bass", "size": MEDIUM},
    {"type": "Ukulele", "size": SMALL},
    {"type": "Violin", "size": SMALL},
    {"type": "Viola", "size": MEDIUM},
    {"type": "Cello", "size": MEDIUM},
    {"type": "Double Bass", "size": MEDIUM},
    {"type": "Banjo", "size": MEDIUM},
    {"type": "Mandolin", "size": SMALL},
    {"type": "Harp", "size": MEDIUM},
    {"type": "Trumpet", "size": SMALL},
    {"type": "Trombone", "size": MEDIUM},
    {"type": "Tuba", "size": MEDIUM},
    {"type": "French Horn", "size": MEDIUM},
    {"type": "Saxophone", "size": MEDIUM},
    {"type": "Clarinet", "size": MEDIUM},
    {"type": "Flute", "size": SMALL},
    {"type": "Oboe", "size": SMALL},
    {"type": "Bassoon", "size": MEDIUM},
    {"type": "Recorder", "size": SMALL},
    {"type": "Drum", "size": MEDIUM},
    {"type": "Cymbal", "size": MEDIUM},
    {"type": "Drum set", "size": LARGE},
    {"type": "Electronic Drums", "size": LARGE},
    {"type": "Drum Pad", "size": MEDIUM},
    {"type": "Percussion", "size": MEDIUM},
    {"type": "Small Percussion", "size": SMALL},
    {"type": "Keyboard", "size": MEDIUM},
    {"type": "Piano", "size": LARGE},
    {"type": "Synthesizer", "size": MEDIUM},
    {"type": "Microphone", "size": SMALL},
    {"type": "Amplifier", "size": MEDIUM},
    {"type": "Speaker", "size": MEDIUM},
    {"type": "Monitor", "size": MEDIUM},
    {"type": "Headphones", "size": SMALL},
    {"type": "Light", "size": SMALL},
    {"type": "Other", "size": MEDIUM},
]


def config_default_gear():
    for gear_type in default_types:
        if Gear_Type.query.filter_by(type=gear_type["type"]).first():
            continue
        gear_type = Gear_Type(**gear_type)
        db.session.add(gear_type)
    return db.session.commit()
