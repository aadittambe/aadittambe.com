// SVG, not ↗/→: SF has no U+2197, and its U+2192 renders thin next to a label.
const LinkIcon = ({ direction = "diagonal" }) => (
  <svg
    className={`link-icon link-icon--${direction}`}
    viewBox="0 0 16 16"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LinkIcon;
