import React, { useState } from "react";
import { BsFillInboxesFill } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import NewClientRequests from "./Logistic/NewClientRequests";
import ViewInventories from "./FBA/ViewInventories";
import InventoryRequests from "./Logistic/InventoryRequests";
import { FaPlay } from "react-icons/fa";
import { AiFillStop } from "react-icons/ai";
import { ImFacebook2 } from "react-icons/im";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { LiaStarSolid } from "react-icons/lia";
import OrderRequests from "./Logistic/OrderRequests";
import { TbLocationDiscount } from "react-icons/tb";
import { MdError } from "react-icons/md";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ViewOrders from "./FBM/ViewOrders";
import InputBox from "../components/InputBox";
import CustomButton from "../components/CustomButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") return; // Prevent adding empty tasks
    const newTaskObj = { text: newTask, completed: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask(""); // Reset input field after adding a task
  };

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="w-1/3 mx-auto">
      <div className="bg-white shadow-md rounded-lg py-4 px-5">
        <dt className="mb-5 text-2xl font-extrabold">To-Do List</dt>
        <div className="mb-4 flex flex-row space-x-3 items-center justify-center">
          <InputBox
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          {/* <CustomButton
            onClick={handleAddTask}
            width="w-fit w-[5rem] whitespace-nowrap"
            padding="px-2"
            label="Add"
          /> */}
        </div>
        <div className="divide-y divide-gray-200">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span
                className={`text-gray-700 ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.text}
              </span>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={task.completed}
                onChange={() => handleToggleTask(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SocialCard = (props) => {
  return (
    <div className="card card-social w-full shadow-md bg-white rounded-lg p-5">
      <div className="card-block border-b mb-3 pb-2">
        <div className="flex items-start justify-center">
          <div className="flex-none">{props?.icon}</div>
          <div className="flex-grow text-right">
            <h3 className="text-xl font-bold">{props?.number || "999"}</h3>
            <h5 className="text-green-500 mb-0">
              {props?.prelabel || "+9.8%"}{" "}
              <span className="text-muted">
                {props?.label || "Total Likes"}
              </span>
            </h5>
          </div>
        </div>
      </div>
      <div className="card-block">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-1/2">
            <h6 className="text-center mb-2.5">
              <span className="text-muted mr-1.5">Target:</span>35,098
            </h6>
            <div className="progress bg-gray-200 rounded-full">
              <div
                className="bg-gradient-to-r rounded-full from-blue-500 to-green-300 w-3/5 h-1.5"
                role="progressbar"
                aria-valuenow="60"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div className="w-1/2">
            <h6 className="text-center mb-2.5">
              <span className="text-muted mr-1.5">Duration:</span>3,539
            </h6>
            <div className="progress bg-gray-200 rounded-full">
              <div
                className="bg-gradient-to-l rounded-full from-blue-500 to-green-300 w-9/20 h-1.5"
                role="progressbar"
                aria-valuenow="45"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = (props) => {
  return (
    <div class="w-full flex flex-col items-center justify-center shadow-md bg-white rounded-lg py-10">
      {props?.icon}
      <dt class="mb-2 mt-5 text-center text-3xl md:text-4xl font-extrabold">
        {props?.value}
      </dt>
      <dd class="font-light text-gray-500 dark:text-gray-400">
        {props?.label}
      </dd>
    </div>
  );
};

const CardThin = (props) => {
  return (
    <div class="w-full flex flex-row items-center justify-start shadow-md bg-white rounded-lg py-4 pl-10">
      {props?.icon}
      <div className="ml-4">
        <dt class="text-3xl md:text-4xl font-extrabold">{props?.value}</dt>
        <dd class="font-light text-gray-500 dark:text-gray-400">
          {props?.label}
        </dd>
      </div>
    </div>
  );
};

const RatingCard = () => {
  return (
    <div className="card-block shadow-md bg-white rounded-lg p-4">
      <dt class="mb-5 text-xl font-extrabold">Ratings</dt>
      <div className="flex items-center justify-center mb-5">
        <div className="w-full">
          <h2 className="font-semibold flex items-center justify-start m-0 text-3xl">
            4.7 <LiaStarSolid color="" className="ml-2 fill-orange-500" />
          </h2>
        </div>
      </div>
      <div className="row">
        {[
          {
            star: 1,
            count: 76,
          },
          {
            star: 2,
            count: 45,
          },
          {
            star: 3,
            count: 64,
          },
          {
            star: 4,
            count: 24,
          },
          {
            star: 5,
            count: 34,
          },
        ].map((star, index) => (
          <div className="col-xl-12" key={index}>
            <div className="flex justify-between items-center">
              <h6 className="flex items-center">
                <LiaStarSolid
                  color=""
                  className="-translate-y-[1.5px] mr-3 fill-orange-500"
                />
                {star.star}
              </h6>
              <h6 className="flex items-center">{star.count}</h6>
            </div>
            <div className="mt-7.5 mb-5 h-1.5 bg-gray-200 rounded-full">
              <div
                className="bg-gradient-to-l from-blue-500 to-green-300 h-1.5 rounded-full"
                style={{ width: `${70 - star.star * 15}%` }} // Example width calculation
                aria-valuenow={70 - star.star * 15}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex w-full flex-row space-x-3">
        <Card
          label="Total Order Delivered Count"
          value={<ViewOrders totalOrders />}
          icon={<TbLocationDiscount className="fill-accent_2 text-4xl" />}
        />
        <Card
          label="Invoice Due Count"
          value={"5"}
          icon={<FaFileInvoice className="fill-accent_2 text-4xl" />}
        />
        <Card
          label="Order That Requires Action"
          value={"4"}
          icon={<MdError className="fill-accent_2 text-4xl" />}
        />
      </div>
      <div className="w-full mt-5 flex  flex-row space-x-3">
        <div className="relative w-2/3  flex-col shadow-md bg-white rounded-lg py-2">
          <dt class="mb-2 mt-5 px-5 text-2xl font-extrabold">
            Orders Analytics
          </dt>
          <div className="overflow-auto w-[40%] m-auto pb-5">
            <Pie
              data={{
                labels: ["Cancelled", "Accepted", "Requested"],
                datasets: [
                  {
                    label: "Orders Analytics",
                    data: [12, 19, 3],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(255, 206, 86, 0.6)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </div>
        {/* <div className="w-1/3 mx-auto ">
          <div className="bg-white shadow-md rounded-lg py-4 px-5">
            <dt class="mb-5 text-2xl font-extrabold">To-Do List</dt>
            <div className="mb-4">
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Add a new task..."
              />
            </div>
            <div className="divide-y divide-gray-200">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Task 1</span>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Task 2</span>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Task 3</span>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </div>
            </div>
          </div>
        </div> */}
        <ToDoList />
      </div>
      <div className="relative w-full flex-col shadow-md bg-white rounded-lg py-2 mt-5">
        <dt class="mb-2 mt-5 px-5 text-2xl font-extrabold">FBM Analytics</dt>
        <div className="overflow-auto w-[80%] m-auto pb-5">
          <Bar
            data={{
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              datasets: [
                {
                  label: "Cancelled Orders",
                  data: [5, 10, 4, 6, 3, 7, 8, 5, 6, 2, 4, 1], // Sample data for each month
                  backgroundColor: "rgba(255, 99, 132, 0.6)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
                {
                  label: "Accepted Orders",
                  data: [15, 20, 10, 16, 13, 17, 18, 15, 16, 12, 14, 11], // Sample data for each month
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
                {
                  label: "Requested Orders",
                  data: [8, 7, 5, 9, 6, 8, 7, 6, 5, 4, 3, 2], // Sample data for each month
                  backgroundColor: "rgba(255, 206, 86, 0.6)",
                  borderColor: "rgba(255, 206, 86, 1)",
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </div>
      {/* <div className="w-full flex flex-row space-x-3 mt-5">
        <div className="w-1/3">
          <RatingCard />
        </div>
        <div className="w-2/3">
          <div className="relative w-full flex-col shadow-md bg-white rounded-lg py-2">
            <dt class="mb-3 mt-2 px-5 text-xl font-extrabold">
              Latest Order Requests
            </dt>
            <div className="overflow-auto">
              <OrderRequests onlyTable={true} />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
