import Portrait from "./Portrait.jsx";

/** Renders a real photo when `item.image` is set, otherwise the vector portrait. */
export default function Media({ item, className = "", imgClassName = "h-full w-full object-cover", float = true, delay = 0 }) {
  if (item.image) {
    return <img src={item.image} alt={item.name || ""} className={imgClassName} loading="lazy" draggable="false" />;
  }
  return <Portrait look={item.look} className={className} float={float} delay={delay} />;
}
