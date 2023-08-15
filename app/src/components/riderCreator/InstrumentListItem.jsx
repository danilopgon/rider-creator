import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useRiderCreationContext from "../../context/RiderCreationContext";

const InstrumentListItem = ({ id, type, notes, order, moveInstrument }) => {
  const { actions } = useRiderCreationContext();
  const { handleUpdateNotes } = actions;

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "instrument",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragOrder = item.order;
      const hoverOrder = order;
      // Don't replace items with themselves
      if (dragOrder === hoverOrder) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragOrder < hoverOrder && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragOrder > hoverOrder && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveInstrument(dragOrder, hoverOrder);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverOrder;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "instrument",
    item: () => {
      return { id, order };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const transform = isDragging ? "translate(0, -100%)" : "none";
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="p-4 bg-base-200 shadow-lg rounded-lg border border-primary"
      style={{ transform }}
      data-handler-id={handlerId}
    >
      <div className="inline-block  text-xl text-center pr-2  font-bold text-base-content">
        {order + 1}
      </div>
      <div className=" inline text-lg font-medium text-base-content ">
        {type}
      </div>

      <div className="text-base-content">
        {notes ? notes : "Añade información al instrumento"}
      </div>

      <Formik
        initialValues={{ notes: "" }}
        onSubmit={(values) => {
          handleUpdateNotes({ id, notes: values.notes });
          values.notes = "";
        }}
        validationSchema={null}
      >
        <Form>
          <Field
            className="w-full mt-2 p-2 border border-primary rounded-md"
            name="notes"
            type="textarea"
          />
          <button
            className="mt-4 px-4 py-2 bg-primary w-full text-white rounded-md hover:bg-indigo-600"
            type="submit"
          >
            Modificar notas
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default InstrumentListItem;
