from utils.db import db
from models.gear_type import Gear_Type

default_types = [
    {"type": "Guitar", "size": "Medium"},
    {"type": "Acoustic Guitar", "size": "Medium"},
    {"type": "Bass", "size": "Medium"},
    {"type": "Acoustic Bass", "size": "Medium"},
    {"type": "Ukulele", "size": "Small"},
    {"type": "Violin", "size": "Small"},
    {"type": "Viola", "size": "Medium"},
    {"type": "Cello", "size": "Large"},
    {"type": "Double Bass", "size": "Large"},
    {"type": "Banjo", "size": "Medium"},
    {"type": "Mandolin", "size": "Small"},
    {"type": "Harp", "size": "Large"},
    {"type": "Trumpet", "size": "Small"},
    {"type": "Trombone", "size": "Medium"},
    {"type": "Tuba", "size": "Large"},
    {"type": "French Horn", "size": "Medium"},
    {"type": "Saxophone", "size": "Medium"},
    {"type": "Clarinet", "size": "Medium"},
    {"type": "Flute", "size": "Small"},
    {"type": "Oboe", "size": "Small"},
    {"type": "Bassoon", "size": "Medium"},
    {"type": "Recorder", "size": "Small"},
    {"type": "Drum", "size": "Medium"},
    {"type": "Cymbal", "size": "Medium"},
    {"type": "Drum set", "size": "Large"},
    {"type": "Electronic Drums", "size": "Large"},
    {"type": "Drum Pad", "size": "Medium"},
    {"type": "Percussion", "size": "Medium"},
    {"type": "Small Percussion", "size": "Small"},
    {"type": "Keyboard", "size": "Medium"},
    {"type": "Piano", "size": "Large"},
    {"type": "Synthesizer", "size": "Medium"},
    {"type": "Microphone", "size": "Small"},
    {"type": "Amplifier", "size": "Medium"},
    {"type": "Speaker", "size": "Large"},
    {"type": "Monitor", "size": "Medium"},
    {"type": "Headphones", "size": "Small"},
    {"type": "Light", "size": "Small"},
    {"type": "Other", "size": "Medium"},
]


def config_default_gear():
    for gear_type in default_types:
        if Gear_Type.query.filter_by(type=gear_type["type"]).first():
            continue
        gear_type = Gear_Type(**gear_type)
        db.session.add(gear_type)
    return db.session.commit()
