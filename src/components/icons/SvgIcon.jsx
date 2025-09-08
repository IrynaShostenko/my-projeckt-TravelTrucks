import spriteUrl from "../../assets/icons.svg?url";

function SvgIcon({ name, className, ...rest }) {
  return (
    <svg className={className} {...rest} aria-hidden="true">
      <use href={`${spriteUrl}#${name}`} />
    </svg>
  );
}

export default SvgIcon;