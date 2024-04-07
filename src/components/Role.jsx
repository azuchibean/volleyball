import "../styles/role.css";
import {useDroppable} from '@dnd-kit/core';

function Team(props) {

    const {isOver, setNodeRef} = useDroppable({
        id: `droppable-1`,
      });
      const backgroundColor = isOver ? 'green' : undefined;

      // try dragoverlay?

    return (
        <tr ref={setNodeRef} style={{background:backgroundColor}}>
            <th>Team {props.teamNum+1}</th>
            <td className="playercard"><p>Setter</p></td>
            <td className="playercard">Power 1</td>
            <td className="playercard">Power 2</td>
            <td className="playercard">Middle 1</td>
            <td className="playercard">Middle 2</td>
            <td className="playercard">Right</td>
        </tr>
    
    );
}

export default function TeamTable(props) {

    const { teamSize } = props;
    const teams = Array.from({ length: teamSize }, (_, index) => <Team key={index} teamNum = {index}/>);


    return (
        <table>
            <tbody>{teams}</tbody>
        </table>
    );
}