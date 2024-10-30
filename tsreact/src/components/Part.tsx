export type ModelPart = { name: string, exerciseCount: number };
export const Part = ({ course }: { course: ModelPart }) => {
  return <p>
    {course.name} {course.exerciseCount}
  </p>
}
