const colors = {
  primary: "#2F3136",
  success: "#46A15A",
  error: "#DC4343",
};

const options = (color) => ({
  position: "center",
  style: {
    backgroundColor: colors[color],
    color: "#FFFFFF",
    fontFamily: "Segoe UI",
    fontSize: "14px",
    textAlign: "left",
    boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.25)",
  },
  closeStyle: {
    color: "#FFF",
    fontSize: "14px",
  },
});

export default options;