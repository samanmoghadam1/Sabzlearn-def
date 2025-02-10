import Course from "./Courses";
import { CourseItemInterface } from "@/app/courses/page";

const AllCourses = ({ arr }: { arr: any }) => {
  return (
    <div style={{maxWidth: "1300px", margin: 'auto'}} className="row d-flex   my-5 ">
      {arr.map((item: CourseItemInterface, index: number) => {
        return (
          <Course
            description={item.description}
            id={item.id}
            price={item.price}
            point={item.point}
            image={item.image}
            offer={item.offer}
            studentsNumber={item.number_of_sessions || 0}
            title={item.name}
            teacher={item.user_data.name}
            key={index}
            user_id={item.user_data.id}
          />
        );
      })}
    </div>
  );
};

export default AllCourses;
