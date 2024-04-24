import React, { useState, useEffect } from "react";
import "../styles/role.css";
import { useDroppable, DndContext } from "@dnd-kit/core";
import Players from "./Players";

function DroppableEntry(props) {
  const { setNodeRef } = useDroppable({
    id: `${props.id}`,
  });

  return (
    <td ref={setNodeRef} className="playercard">
      {props.children}
    </td>
  );
}

function Team(props) {
  const roles = [
    "Setter",
    "Power 1",
    "Power 2",
    "Middle 1",
    "Middle 2",
    "Right",
  ];

  let num = null;
  if (typeof props.currPlayer === "string") {
    num = props.currPlayer.match(/\d+/);
    if (num) {
      num = num[0];
      console.log(num);
    }
  }

  return (
    <tr>
      <th>Team {props.teamNum + 1}</th>
      {roles.map((role) => (
        <DroppableEntry
          key={`${role}-${props.teamNum + 1}`}
          id={`${role}-${props.teamNum + 1}`}
          role={role}
        >
          {props.parent === `${role}-${props.teamNum + 1}`
            ? Players()[num]
            : role}
        </DroppableEntry>
      ))}
    </tr>
  );
}

export default function TeamTable(props) {
  const { teamSize } = props;
  const [parent, setParent] = useState(null);
  const [currPlayer, setCurrPlayer] = useState(null);

  useEffect(() => {
    console.log("Parent updated:", parent);
  }, [parent]);

  function handleDragEnd(event) {
    const { active, over } = event;
    setParent(over ? over.id : null);
    setCurrPlayer(active ? active.id: null);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <table>
        <tbody>
          {Array.from({ length: teamSize }, (_, index) => (
            <Team key={index} teamNum={index} parent={parent} currPlayer={currPlayer} />
          ))}
        </tbody>
      </table>
      <Players />
    </DndContext>
  );
}
