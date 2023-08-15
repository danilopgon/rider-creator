import update from "immutability-helper";
import { useCallback } from "react";

import useRiderCreationContext from "../../context/RiderCreationContext";
import InstrumentListItem from "./InstrumentListItem";

export const InstrumentList = () => {
  const { store, actions } = useRiderCreationContext();
  const { instrumentInformation } = store;
  const { setInstrumentInformation } = actions;

  const moveInstrument = useCallback(
    (dragOrder, hoverOrder) => {
      setInstrumentInformation((prev) => {
        const updatedInstrumentInformation = update(prev, {
          $splice: [
            [dragOrder, 1],
            [hoverOrder, 0, prev[dragOrder]],
          ],
        });
        // Update the order property of each instrument to match the new order in the list
        return updatedInstrumentInformation.map((instrument, index) => ({
          ...instrument,
          order: index,
        }));
      });
    },
    [instrumentInformation, setInstrumentInformation]
  );

  const renderInstrumentListItem = useCallback((instrument, order) => {
    return (
      <InstrumentListItem
        key={instrument.id}
        type={instrument.type}
        id={instrument.id}
        notes={instrument.notes}
        order={order}
        moveInstrument={moveInstrument}
      />
    );
  }, []);
  return (
    <>
      <div>
        {instrumentInformation.map((card, i) =>
          renderInstrumentListItem(card, i)
        )}
      </div>
    </>
  );
};

export default InstrumentList;
