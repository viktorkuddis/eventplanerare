import styles from "./ColorPickerButton.module.css";

type PropType = {
  isSelected?: boolean;
  colorValue: string;
  colorName: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const ColorPickerButton = ({
  isSelected = false,
  colorValue = "grey",
  colorName = "Färg",
  onClick
}: PropType) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className={`${styles.button} ${isSelected && styles.selected}`}
      onClick={onClick}
    >
      <div
        className={styles.colorSample}
        style={{ backgroundColor: colorValue }}
      ></div>
      <small>
        <p>{colorName}</p>
      </small>
    </div>
  );
};

export default ColorPickerButton;
