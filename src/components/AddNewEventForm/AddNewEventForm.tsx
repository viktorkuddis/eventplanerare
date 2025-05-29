import React, { useState } from "react";
import styles from "./AddNewEventForm.module.css";

interface EventFormValues {
  title: string;
  description: string;
  startDate: string; // Nu lagrar vi datetime-sträng
  endDate: string; // Nu lagrar vi datetime-sträng
  location: string;
}

const defaultFormValues: EventFormValues = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  location: "",
};

const AddNewEventForm: React.FC = () => {
  const [eventData, setEventData] =
    useState<EventFormValues>(defaultFormValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event Data:", eventData);
    // Här kan du hantera datan vidare
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="title">Eventets Namn:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={eventData.title}
        onChange={handleChange}
        required
      />
      <div className={styles.timeSection}>
        <label htmlFor="startDate">Startar:</label>

        <input
          type="datetime-local"
          id="startDate"
          name="startDate"
          value={eventData.startDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="endDate">Slutar :</label>

        <input
          type="datetime-local"
          id="endDate"
          name="endDate"
          value={eventData.endDate}
          onChange={handleChange}
          required
        />
      </div>

      <label htmlFor="description">Beskrivning:</label>
      <textarea
        id="description"
        name="description"
        value={eventData.description}
        onChange={handleChange}
      />

      <label htmlFor="location">Plats:</label>

      <input
        type="text"
        id="location"
        name="location"
        value={eventData.location}
        onChange={handleChange}
      />

      <div>
        <button type="submit">Skapa</button>
        <button type="button">Avbryt</button> {/* Ändrade typ till button */}
      </div>
    </form>
  );
};

export default AddNewEventForm;
