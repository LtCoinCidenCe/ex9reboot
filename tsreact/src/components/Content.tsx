import { ModelPart, Part } from "./Part";

const Content = ({ courseParts }: { courseParts: ModelPart[] }) => {
  return courseParts.map(part => <Part key={part.name} course={part} />)
}

export default Content;
