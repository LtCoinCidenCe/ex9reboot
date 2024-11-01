import { CoursePart } from "../types"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case "basic":
      return <div style={{ margin: "1em 0em 1em 0em" }}>
        <div style={{ fontWeight: "bold" }}>{course.name} {course.exerciseCount}</div>
        <div style={{ fontStyle: "italic" }}>{course.description}</div>
      </div>

    case "group":
      return <div style={{ margin: "1em 0em 1em 0em" }}>
        <div style={{ fontWeight: "bold" }}>{course.name} {course.exerciseCount}</div>
        <div>project exercises {course.groupProjectCount}</div>
      </div>

    case "background":
      return <div style={{ margin: "1em 0em 1em 0em" }}>
        <div style={{ fontWeight: "bold" }}>{course.name} {course.exerciseCount}</div>
        <div style={{ fontStyle: "italic" }}>{course.description}</div>
        <div>submit to {course.backgroundMaterial}</div>
      </div>

    case "special":
      return <div style={{ margin: "1em 0em 1em 0em" }}>
        <div style={{ fontWeight: "bold" }}>{course.name} {course.exerciseCount}</div>
        <div style={{ fontStyle: "italic" }}>{course.description}</div>
        <div>required skills: {course.requirements.join(',')}</div>
      </div>
    default:
      assertNever(course);
      break;
  }
}
