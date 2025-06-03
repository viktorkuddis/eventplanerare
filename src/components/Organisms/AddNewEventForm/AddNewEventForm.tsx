import React, { useState } from "react";
import styles from "./AddNewEventForm.module.css";
import ColorPickerButton from "../../atoms/colorPickerButton/ColorPickerButton";

import { colors } from "../../../constants/eventColors";


import { useDbApi } from "../../../api/useDbApi";
import { useAuth } from "@clerk/clerk-react";
import type { EventType } from "../../../types";


type Props = {
  onCancel: () => void | null
  onEventCreated: () => void | null
}




const AddNewEventForm: React.FC<Props> = ({ onCancel, onEventCreated }) => {

  const { createNewEvent } = useDbApi();
  const { userId } = useAuth();



  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [color, setColor] = useState<string>("");



  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const combinedStart = new Date(startDate + "T" + startTime + ":00");
    const combinedEnd = new Date(endDate + "T" + endTime + ":00");


    if (combinedEnd <= combinedStart) {
      alert("Du kan inte sluta innan du börjat! LOO0oolZ 🙃");
      return;
    } else {
      const newEventData: EventType = {
        title: title,
        description: description,
        location: location,
        color: color,
        start: combinedStart,
        end: combinedEnd,
        ownerUserAuthId: userId
      }
      console.log("försökte submitta detta :")
      console.log(newEventData)


      clearForm()

      //kör onEventCreated om den finns definerad utifrån:) 
      if (onEventCreated) onEventCreated()


      try {
        const response = await createNewEvent(newEventData);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }



  }

  function handleCancel() {
    clearForm()
    //kör onCancel om den finns definerad utifrån:) 
    if (onCancel) onCancel()
  }

  function clearForm() {
    setTitle("")
    setDescription("")
    setStartDate("")
    setStartTime("")
    setEndDate("")
    setEndTime("")
    setLocation("")
    setColor("")
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="title">Eventets Namn: * </label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        // value={eventData.title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className={styles.timeSection}>
        <label>Startar: * </label>
        <div className={styles.timeSectionInputGroup}>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            {/* <button className="btn-small btn-filled-strong">X</button> */}
          </div>
        </div>
        <label>Slutar: *</label>
        <div className={styles.timeSectionInputGroup}>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
            {/* <button className="btn-small btn-filled-strong">X</button> */}
          </div>
        </div>
      </div>
      <label htmlFor="description">Beskrivning: </label>
      <textarea
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="location">Plats: </label>
      <input
        type="text"
        id="location"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}

      />


      <div className={styles.colorPickerSectionWrapper}>
        <div className={styles.colorPickerGrid}>
          {colors.map((c, index) => {
            return (
              <ColorPickerButton
                onClick={() => {
                  setColor(c.colorValue)
                  console.log("KLICKK")
                }}
                key={index}
                colorValue={c.colorValue}
                colorName={c.colorName}
                isSelected={c.colorValue == color}
              />
            );
          })}
          <ColorPickerButton
            onClick={() => {
              setColor("")
              console.log("KLICKK")
            }}

            colorValue={"hsla(0, 0%, 50%, 0.1)"}
            colorName={"Ingen "}

          />
        </div>
      </div>

      <div>
        <button type="submit">Skapa</button>
        <button type="button" onClick={handleCancel}>Avbryt</button>
        {/* <button type="button" onClick={clearForm}>rens</button> */}

      </div>
    </form>
  );
};

export default AddNewEventForm;
