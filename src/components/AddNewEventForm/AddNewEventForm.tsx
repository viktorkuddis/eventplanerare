import React, { useState, useEffect } from "react";
import styles from "./AddNewEventForm.module.css";

interface EventFormValues {
  title: string;
  description: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endDate: string; // YYYY-MM-DD
  endTime: string; // HH:mm
  location: string;
}

const defaultFormValues: EventFormValues = {
  title: "",
  description: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  location: "",
};

const AddNewEventForm: React.FC = () => {
  const [eventData, setEventData] =
    useState<EventFormValues>(defaultFormValues);
  const [combinedStartDateTime, setCombinedStartDateTime] =
    useState<string>("");
  const [combinedEndDateTime, setCombinedEndDateTime] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (eventData.startDate && eventData.startTime) {
      setCombinedStartDateTime(`${eventData.startDate}T${eventData.startTime}`);
    } else {
      setCombinedStartDateTime("");
    }

    if (eventData.endDate && eventData.endTime) {
      setCombinedEndDateTime(`${eventData.endDate}T${eventData.endTime}`);
    } else {
      setCombinedEndDateTime("");
    }
  }, [
    eventData.startDate,
    eventData.startTime,
    eventData.endDate,
    eventData.endTime,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Start DateTime:", combinedStartDateTime);
    console.log("End DateTime:", combinedEndDateTime);
    console.log("Övrig Event Data:", {
      title: eventData.title,
      description: eventData.description,
      location: eventData.location,
    });
    // Här skickar du combinedStartDateTime och combinedEndDateTime till din databas
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
        <div className={styles.timeSectionInputGroup}>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={eventData.startDate}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={eventData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <label htmlFor="endDate">Slutar:</label>
        <div className={styles.timeSectionInputGroup}>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={eventData.endDate}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={eventData.endTime}
            onChange={handleChange}
            required
          />
        </div>
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
        <button type="button">Avbryt</button>
      </div>
    </form>
  );
};

export default AddNewEventForm;
