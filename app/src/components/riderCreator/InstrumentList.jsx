import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

import useRiderCreationContext from "../../context/RiderCreationContext";

const InstrumentListItem = ({ instrument, index, moveInstrument }) => {
  const [notes, setNotes] = useState(instrument.notes);

  const [{ isDragging }, drag] = useDrag({
    type: "instrument",
    item: () => ({ id: instrument.id }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "instrument",
    hover(item, monitor) {
      if (item.id === instrument.id) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      moveInstrument(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  const backgroundColor = isOver ? "#e5e5e5" : "transparent";
  const cursor = canDrop ? "move" : "default";

  return (
    <div
      ref={drop}
      style={{ opacity, backgroundColor, cursor }}
      className="flex items-center justify-between px-4 py-2 border-b border-gray-200"
    >
      <div ref={drag} className="flex items-center">
        <div className="text-lg font-medium">{instrument.name}</div>
        <div className="text-sm text-gray-500 ml-2">{instrument.type}</div>
      </div>
      <input
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add notes"
        className="border border-gray-300 rounded-md px-2 py-1 text-sm w-40"
      />
    </div>
  );
};

const InstrumentsList = () => {
  const { store, actions } = useRiderCreationContext();
  const { instrumentInformation } = store;
  const { onInstrumentOrderChange } = actions;

  const moveInstrument = (dragIndex, hoverIndex) => {
    const dragInstrument = Object.values(instrumentInformation)[dragIndex];
    const updatedInstrumentInformation = Object.values(
      instrumentInformation
    ).map((instrument, index) => {
      if (index === dragIndex) {
        return { ...dragInstrument, order: hoverIndex };
      }
      if (index === hoverIndex) {
        return { ...instrument, order: dragIndex };
      }

      return {
        ...instrument,
        order:
          instrument.order >= dragIndex && instrument.order <= hoverIndex
            ? instrument.order + 1
            : instrument.order >= hoverIndex && instrument.order <= dragIndex
            ? instrument.order - 1
            : instrument.order,
      };
    });
    onInstrumentOrderChange(updatedInstrumentInformation);
  };

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      {Object.values(instrumentInformation)
        .sort((a, b) => {
          const aOrder = a.order ?? 0;
          const bOrder = b.order ?? 0;
          return aOrder - bOrder;
        })
        .map((instrument, index) => (
          <InstrumentListItem
            key={instrument.id}
            instrument={instrument}
            index={index}
            moveInstrument={moveInstrument}
          />
        ))}
    </div>
  );
};

export default InstrumentsList;
