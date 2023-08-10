const instrumentToIcon = (instrument) => {
  switch (instrument) {
    case "Guitar":
      return "guitarra-electrica.svg";
    case "Acoustic Guitar":
      return "guitarra-acustica.svg";
    case "Bass":
      return "bajo-electrico.svg";
    case "Acoustic Bass":
      return "bajo-acustico.svg";
    case "Ukulele":
      return "ukulele.svg";
    case "Violin":
      return "violin.svg";
    case "Viola":
      return "viola.svg";
    case "Cello":
      return "chelo.svg";
    case "Double Bass":
      return "contrabajo.svg";
    case "Banjo":
      return "banjo.svg";
    case "Mandolin":
      return "mandolin.svg";
    case "Harp":
      return "arpa.svg";
    case "Trumpet":
      return "trompeta.svg";
    case "Trombone":
      return "trombon.svg";
    case "Tuba":
      return "tuba.svg";
    case "French Horn":
      return "cuerno-frances.svg";
    case "Saxophone":
      return "saxofon.svg";
    case "Clarinet":
      return "clarinete.svg";
    case "Flute":
      return "flauta.svg";
    case "Oboe":
      return "oboe.svg";
    case "Bassoon":
      return "fagot.svg";
    case "Recorder":
      return "flauta-2.svg";
    case "Drum":
      return "caja.svg";
    case "Cymbal":
      return "plato.svg";
    case "Drum set":
      return "bateria.svg";
    case "Electronic Drums":
      return "bateria-electronica.svg";
    case "Drum Pad":
      return "pad-bateria.svg";
    case "Percussion":
      return "bongos.svg";
    case "Small Percussion":
      return "triangulo.svg";
    case "Keyboard":
      return "teclado.svg";
    case "Piano":
      return "piano.svg";
    case "Synthesizer":
      return "teclado.svg";
    case "Microphone":
      return "microfono.svg";
    case "Amplifier":
      return "amplificador.svg";
    case "Speaker":
      return "altavoz.svg";
    case "Monitor":
      return "monitor.svg";
    case "Headphones":
      return "headphones.svg";
    case "Light":
      return "foco.svg";
    case "Other":
      return "other.svg";
    default:
      return "other.svg";
  }
};

export default instrumentToIcon;
