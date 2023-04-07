import styles from "./AdminPanel.module.scss";
import { useState } from "react";
import EditWindow from "./EditWindow/EditWindow";
import AddWindow from "./AddWindow/AddWindow";
const AdminPanel = ({ types }: {types: string[]}) => {
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);

  return (
    <div className={styles.adminPanel}>
      <div className={styles.buttons}>
        <button onClick={() => {
          setAdd(!add)
          document.getElementsByTagName("body")[0].style.overflow ="hidden";
          }} role="button" id="addWindow">Добавить товар</button>
        <button onClick={() => {
          setEdit(!edit)
          document.getElementsByTagName("body")[0].style.overflow ="hidden";
          }} id="editWindow">Редактировать товар</button>
      </div>

      <div className={`${styles.overlay} ${add || edit ? `${styles.show}` : ""}`}>
        <>
          <EditWindow edit={edit} setEdit={setEdit} types={types} />
          <AddWindow add={add} setAdd={setAdd} types={types}/>
        </>
      </div>
    </div>
  );
};

export default AdminPanel;
