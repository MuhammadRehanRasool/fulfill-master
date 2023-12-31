import React, { useContext, useState, useEffect } from "react";
import {
  setMessage,
  resetMessage,
  CONSTANT,
  camelCaseToNormalString,
} from "../../CONSTANT";
import UserData from "../../contexts/UserData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModalWrapper from "../../components/ModalWrapper";
import InputBox from "../../components/InputBox";
import CustomButton from "../../components/CustomButton";
import { Tooltip } from "react-tooltip";
import { MdModeEditOutline } from "react-icons/md";
import { FaRocket } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { FaShippingFast } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { MdClose } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

const RenderRow = ({ data, isEdit, setIsEdit, updateStatus, onlyTable }) => {
  const [options, setOptions] = useState(false);

  const [openDesc, setOpenDesc] = useState(false);

  return (
    <tr className="bg-white border-b dark:border-gray-700">
      <td className="px-6 py-4 sticky left-0 bg-white">
        <span
          className={`${
            data?.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : data?.status === "requested"
              ? "bg-indigo-100 text-indigo-800"
              : data?.status === "acknowledged"
              ? "bg-purple-100 text-purple-800"
              : data?.status === "shipped"
              ? "bg-blue-100 text-blue-800"
              : data?.status === "delivered"
              ? "bg-green-100 text-green-800"
              : data?.status === "cancelled"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          } text-sm font-medium me-2 px-2.5 py-0.5 rounded`}
        >
          {camelCaseToNormalString(data?.status)}
        </span>
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <div className="flex flex-col">
          <span>{data?.user?.name}</span>
          <span>{data?.user?.email}</span>
          <span>{data?.user?.companyName}</span>
        </div>
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {data?.product?.nameOnInventory}
      </th>
      <td className="px-6 py-4">{camelCaseToNormalString(data?.labelType)}</td>
      <td className="px-6 py-4">
        {data?.pdf && (
          <span
            onClick={() => {
              const pdfUrl = `${CONSTANT.server}${data?.pdf}`;
              window.open(pdfUrl, "_blank", "noopener,noreferrer");
            }}
            className="cursor-pointer text-indigo-500 smooth-transition hover:text-indigo-300"
          >
            Preview PDF
          </span>
        )}
      </td>
      <td
        className="px-6 py-4 cursor-pointer hover:text-gray-500"
        onClick={() => {
          setOpenDesc(!openDesc);
        }}
      >
        {openDesc
          ? data?.prep === ""
            ? ""
            : data?.prep
          : `${data?.prep.slice(0, 40)}...`}
      </td>
      <td className="px-6 py-4">{data?.expectedDeliveryDate}</td>
      <td className="px-6 py-4">{data?.trackingNumber || "-"}</td>
      <td className="px-6 py-4">
        {new Date(data?.timestamp)?.toLocaleString()}
      </td>
      {!onlyTable && (
        <td className="px-6 py-4 sticky right-0 bg-white">
          <div className="relative flex items-center">
            <span
              className="bg-transparent smooth-transition hover:bg-slate-100 p-2.5 rounded-full cursor-pointer"
              onClick={() => {
                setOptions(!options);
              }}
            >
              {options ? (
                <MdClose color="black" className="z-0 relative scale-125" />
              ) : (
                <SlOptionsVertical color="black" className="z-0 relative" />
              )}
            </span>
            {options && (
              <div className="ml-2 flex flex-row space-x-2 cursor-pointer">
                <Tooltip anchorSelect="#acknowledged" place="top">
                  Acknowledged
                </Tooltip>
                <Tooltip anchorSelect="#shipped" place="top">
                  Shipped
                </Tooltip>
                <Tooltip anchorSelect="#delivered" place="top">
                  Delivered
                </Tooltip>
                <Tooltip anchorSelect="#cancel" place="top">
                  Cancel
                </Tooltip>
                <span
                  onClick={(e) => {
                    updateStatus(e, {
                      id: data?.id,
                      status: "acknowledged",
                    });
                  }}
                  id="acknowledged"
                  className="rounded-lg px-2 flex items-center bg-yellow-500"
                >
                  <MdDoneAll color="white" className="w-5 scale-125" />
                </span>
                <span
                  onClick={(e) => {
                    //   updateStatus(e, {
                    //     id: data?.id,
                    //     status: "delivered",
                    //   });
                    setIsEdit({
                      ...isEdit,
                      id: data?.id,
                      open: true,
                    });
                  }}
                  id="shipped"
                  className="rounded-lg p-2 bg-green-500"
                >
                  <FaShippingFast color="white" className="w-5" />
                </span>
                <span
                  onClick={(e) => {
                    updateStatus(e, {
                      id: data?.id,
                      status: "delivered",
                    });
                  }}
                  id="delivered"
                  className="rounded-lg p-2 bg-blue-500"
                >
                  <GrDeliver color="white" className="w-5" />
                </span>
                <span
                  onClick={(e) => {
                    updateStatus(e, {
                      id: data?.id,
                      status: "cancelled",
                    });
                  }}
                  id="cancel"
                  className="rounded-lg p-2 bg-red-500"
                >
                  <TiCancel color="white" className="w-5 scale-150" />
                </span>
              </div>
            )}
          </div>
        </td>
      )}
    </tr>
  );
};

export default function OrderRequests(props) {
  const { session, setSession } = useContext(UserData);

  const [inventories, setInventories] = useState([]);

  const fetchInventories = async () => {
    await axios
      .get(CONSTANT.server + `api/fbm-orders`)
      .then(async (responce) => {
        setInventories(
          responce?.data?.filter((a, b) => {
            return (
              parseInt(a?.product?.warehouse?.id) === session?.personal?.id
            );
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (session.isLoggedIn) {
      fetchInventories();
    }
  }, [session]);

  const [isEdit, setIsEdit] = useState({
    open: false,
    value: "",
    id: null,
  });

  const updateStatus = async (e, __payload = {}) => {
    e.preventDefault();
    resetMessage();
    await axios
      .put(CONSTANT.server + `api/fbm-orders`, {
        ...__payload,
      })
      .then(async (responce) => {
        if (responce?.message) {
          setMessage(responce?.message, "red-500");
        } else {
          fetchInventories();
          //   setIsEdit({
          //     ...isEdit,
          //     open: false,
          //   });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (props?.onlyTable) {
    return (
      <table className="w-full text-sm overflow-auto">
        <thead className="text-xs text-left text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 sticky left-0 bg-black h-fit">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Client
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Label type
            </th>
            <th scope="col" className="px-6 py-3">
              PDF
            </th>
            <th scope="col" className="px-6 py-3">
              Prep
            </th>
            <th scope="col" className="px-6 py-3">
              Expected Delivery Date
            </th>
            <th scope="col" className="px-6 py-3">
              Tracking Number
            </th>
            <th scope="col" className="px-6 py-3">
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody className="text-left whitespace-nowrap">
          {inventories?.slice(0, 5).map((a, b) => {
            return (
              <RenderRow
                data={a}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                updateStatus={updateStatus}
                onlyTable={props?.onlyTable}
              />
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div className="w-full">
      <ModalWrapper
        isOpen={isEdit.open}
        onClose={() => {
          setIsEdit({
            ...isEdit,
            open: false,
          });
        }}
      >
        <div className="w-full">
          <h1 class="mb-5 text-center text-4xl font-extrabold tracking-tight text-black">
            Tracking Number
          </h1>
          <InputBox
            type="text"
            value={isEdit.value}
            onChange={(e) => {
              setIsEdit({
                ...isEdit,
                value: e.target.value,
              });
            }}
            label=""
            placeholder="Enter tracking number"
          />
          <CustomButton
            className="mt-5"
            label="Update"
            onClick={(e) => {
              updateStatus(e, {
                id: isEdit?.id,
                status: "shipped",
                trackingNumber: isEdit?.value,
              });
              setIsEdit({
                open: false,
                value: "",
                id: null,
              });
            }}
            icon={<FaRocket />}
          />
        </div>
      </ModalWrapper>
      <h1 class="text-center mb-5 text-4xl font-extrabold tracking-tight text-black">
        Order Requests
      </h1>
      <div className="w-full mt-10 overflow-auto">
        <table className="w-full text-sm overflow-auto">
          <thead className="text-xs text-left text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 sticky left-0 bg-black h-fit"
              >
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Client
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Label type
              </th>
              <th scope="col" className="px-6 py-3">
                PDF
              </th>
              <th scope="col" className="px-6 py-3">
                Prep
              </th>
              <th scope="col" className="px-6 py-3">
                Expected Delivery Date
              </th>
              <th scope="col" className="px-6 py-3">
                Tracking Number
              </th>
              <th scope="col" className="px-6 py-3">
                Timestamp
              </th>
              <th
                scope="col"
                className="px-6 py-3 sticky right-0 bg-black h-fit"
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody className="text-left whitespace-nowrap">
            {inventories?.map((a, b) => {
              return (
                <RenderRow
                  data={a}
                  setIsEdit={setIsEdit}
                  isEdit={isEdit}
                  updateStatus={updateStatus}
                />
              );
            })}
          </tbody>
        </table>
        {inventories?.length <= 0 && (
          <div className="mt-5 pb-5 w-full flex items-center justify-center">
            No order requests yet.
          </div>
        )}
      </div>
    </div>
  );
}
