const style = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
        backgroundColor: "var(--bg-color-base)",
      }}
    >
      hjk
      <h1> KOMPONENTER</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>KNAPPAR</h2>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button className="btn-filled-primary btn-small">LOGGA IN</button>
          <button className="btn-filled-primary btn-medium">LOGGA IN</button>
          <button className="btn-filled-primary btn-large">LOGGA IN</button>
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button className="btn-outlined-primary btn-small">LOGGA IN</button>
          <button className="btn-outlined-primary btn-medium">LOGGA IN</button>
          <button className="btn-outlined-primary btn-large">LOGGA IN</button>
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button className="btn-filled-strong btn-small">LOGGA IN</button>
          <button className="btn-filled-strong btn-medium">LOGGA IN</button>
          <button className="btn-filled-strong btn-large">LOGGA IN</button>
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button className="btn-outlined-strong btn-small">LOGGA IN</button>
          <button className="btn-outlined-strong btn-medium">LOGGA IN</button>
          <button className="btn-outlined-strong btn-large">LOGGA IN</button>
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "1rem",
            backgroundColor: "var(--brand-color-strong)",
          }}
        >
          <button className="btn-filled-light-static btn-small">
            LOGGA IN
          </button>
          <button className="btn-filled-light-static btn-medium">
            LOGGA IN
          </button>
          <button className="btn-filled-light-static btn-large">
            LOGGA IN
          </button>
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "1rem",
            backgroundColor: "var(--brand-color-strong)",
          }}
        >
          <button className="btn-outlined-light-static btn-small">
            LOGGA IN
          </button>
          <button className="btn-outlined-light-static btn-medium">
            LOGGA IN
          </button>
          <button className="btn-outlined-light-static btn-large">
            LOGGA IN
          </button>
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>Närsta komponent</h2>
        här är mer komponenter{" "}
      </div>
    </div>
  );
};

export default style;
