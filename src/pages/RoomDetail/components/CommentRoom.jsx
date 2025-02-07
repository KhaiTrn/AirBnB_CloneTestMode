import { Modal, Progress, Rate } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { MOCKUP_COMMENT_RANKING } from "../../../common/constant";
import {
  ButtonOutLine,
  ButtonPrimary,
} from "../../../components/ui/button/ButtonCustom";
import { DropdownCustom } from "../../../components/ui/dropdown/DropdownCustom";
import { commentService } from "../../../services/comment.service";
import CommentItem from "./CommentItem";
import LineSpace from "./LineSpace";
import { useRoomDetailContext } from "../../../store/RoomDetailContext";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { pathDefault } from "../../../common/path";
import { NotificationContext } from "../../../App";
import { IoMdClose } from "react-icons/io";
import { useTheme } from "../../../store/ThemeContext";

const desc = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"];

const CommentRoom = ({ roomName, imageRoom, roomId }) => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const { user, token } = useSelector((state) => state.userSlice);
  const { handleNotification } = useContext(NotificationContext);
  const { listComment, setListComment } = useRoomDetailContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenWriteReview, setIsModalOpenWriteReview] = useState(false);
  const [valueRate, setValueRate] = useState(3);
  const [textAreaReview, setTextAreaReview] = useState("");

  const MAX_DISPLAY = 4;
  useEffect(() => {
    getListComment();
  }, [id]);

  const getListComment = () => {
    commentService
      .getListCommentByIdRoom(id)
      .then((res) => {
        setListComment(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSendReview = () => {
    commentService
      .postComment(
        {
          id: 0,
          maPhong: roomId,
          maNguoiBinhLuan: user.id,
          ngayBinhLuan: new Date().toString(),
          noiDung: textAreaReview,
          saoBinhLuan: valueRate,
        },
        token
      )
      .then((res) => {
        handleNotification("success", res.data.message);
        getListComment();
        setIsModalOpenWriteReview(false);
      })
      .catch((err) => {
        console.log(err);
        handleNotification("error", err.message);
      });
  };
  return (
    <div>
      <div className="py-6 space-y-6 px-6 md:px-10 lg:px-4">
        <div>
          <h2 className="text-2xl font-semibold">
            {listComment.length} đánh giá
          </h2>
          <p className="text-[#6a6a6a] text-sm">
            Xếp hạng trung bình sẽ được hiển thị sau khi có 3 đánh giá
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-6 lg:gap-6 md:grid-cols-2 mt-10 !mx-0">
          {listComment.slice(0, 4).map((item, index) => {
            return (
              <CommentItem
                avatar={item.avatar}
                key={index}
                ngayBinhLuan={item.ngayBinhLuan}
                noiDung={item.noiDung}
                tenNguoiBinhLuan={item.tenNguoiBinhLuan}
                saoBinhLuan={item.saoBinhLuan}
              />
            );
          })}
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {listComment.length > MAX_DISPLAY && (
            <div className="flex">
              <ButtonOutLine
                children={`Hiển thị tất cả ${listComment.length} đánh giá`}
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className={
                  "border-[#222] font-semibold w-full px-6 !py-6 text-[#222] hover:!bg-gray-100 hover:shadow-md transition-all duration-200"
                }
              />
              <Modal
                title={null}
                closeIcon={null}
                onCancel={() => {
                  setIsModalOpen(false);
                }}
                centered
                open={isModalOpen}
                className="!w-[75%]"
                footer={null}
              >
                <div className="flex flex-col gap-4  max-h-[90vh]">
                  <div className="p-0 md:p-4">
                    <div
                      className="p-2 cursor-pointer inline-flex"
                      onClick={() => {
                        setIsModalOpen(false);
                      }}
                    >
                      <IoClose size={20} />
                    </div>
                  </div>
                  <div className="flex gap-10 lg:px-12">
                    <div className="hidden md:block w-1/3 overflow-y-auto">
                      <div className="mb-6">
                        <h2 className="font-semibold text-sm mb-2">
                          Xếp hạng tổng thể
                        </h2>
                        <div className="flex gap-2">
                          <p className="text-sm">5</p>
                          <Progress
                            size={"small"}
                            percent={80}
                            showInfo={false}
                            className="flex-1"
                            strokeColor={isDarkMode ? "white" : "#222"}
                            trailColor={isDarkMode ? "black" : ""}
                          />
                        </div>
                        <div className="flex gap-2">
                          <p className="text-sm">4</p>
                          <Progress
                            size={"small"}
                            percent={20}
                            showInfo={false}
                            className="flex-1"
                            strokeColor={isDarkMode ? "white" : "#222"}
                            trailColor={isDarkMode ? "black" : ""}
                          />
                        </div>
                        <div className="flex gap-2">
                          <p className="text-sm">3</p>
                          <Progress
                            size={"small"}
                            percent={5}
                            showInfo={false}
                            className="flex-1"
                            strokeColor={isDarkMode ? "white" : "#222"}
                            trailColor={isDarkMode ? "black" : ""}
                          />
                        </div>
                        <div className="flex gap-2">
                          <p className="text-sm">2</p>
                          <Progress
                            size={"small"}
                            percent={0}
                            showInfo={false}
                            className="flex-1"
                            strokeColor={isDarkMode ? "white" : "#222"}
                            trailColor={isDarkMode ? "black" : ""}
                          />
                        </div>
                        <div className="flex gap-2">
                          <p className="text-sm">1</p>
                          <Progress
                            size={"small"}
                            percent={0}
                            showInfo={false}
                            className="flex-1"
                            strokeColor={isDarkMode ? "white" : "#222"}
                            trailColor={isDarkMode ? "black" : ""}
                          />
                        </div>
                      </div>
                      <div>
                        {MOCKUP_COMMENT_RANKING.map((item, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-4">
                                {item.icon}
                                <p className="text-sm">{item.title}</p>
                              </div>
                              <div className="text-xs">{item.rate}</div>
                            </div>
                            <LineSpace className="my-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <div className="max-h-[70vh] overflow-y-auto">
                        <div className="sticky top-0 w-full flex justify-between bg-white dark:bg-slate-800 z-50 pb-4 border-b border-gray-200">
                          <h3 className="text-2xl font-semibold">
                            {listComment.length} lượt đánh giá
                          </h3>
                          <div className="hidden md:block">
                            <DropdownCustom
                              placement="bottomRight"
                              children={
                                <p className="inline-block">Gần đây nhất</p>
                              }
                              items={[
                                {
                                  label: (
                                    <span className="hover:bg-gray-200 w-full p-2 rounded-md">
                                      Gần đây nhất
                                    </span>
                                  ),
                                },
                                {
                                  label: (
                                    <span className="hover:bg-gray-200 w-full p-2 rounded-md">
                                      Có điểm xếp hạng cao nhất
                                    </span>
                                  ),
                                },
                                {
                                  label: (
                                    <span className="hover:bg-gray-200 w-full p-2 rounded-md">
                                      Có điểm xếp hạng thấp nhất
                                    </span>
                                  ),
                                },
                              ]}
                              className={"!py-1"}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-6 pt-6">
                          {listComment.map((item, index) => {
                            return (
                              <CommentItem
                                avatar={item.avatar}
                                key={index}
                                ngayBinhLuan={item.ngayBinhLuan}
                                noiDung={item.noiDung}
                                tenNguoiBinhLuan={item.tenNguoiBinhLuan}
                                saoBinhLuan={item.saoBinhLuan}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          )}
          {user ? (
            <>
              <ButtonOutLine
                onClick={() => {
                  setIsModalOpenWriteReview(true);
                }}
                className={
                  "border-[#222] font-semibold px-6 !py-6 hover:!bg-gray-100 hover:shadow-md transition-all duration-200"
                }
              >
                Viết đánh giá
              </ButtonOutLine>
              <Modal
                title={
                  <div className="text-center dark:text-slate-200">
                    Viết đánh giá
                  </div>
                }
                closeIcon={
                  <IoMdClose className="text-black dark:text-slate-200" />
                }
                open={isModalOpenWriteReview}
                footer={null}
                onCancel={() => {
                  setIsModalOpenWriteReview(false);
                }}
              >
                <div className="flex flex-col gap-6 py-4">
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <img
                      src={imageRoom}
                      alt={roomName}
                      className="w-full rounded-xl max-h-64"
                    />
                    <h2 className="text-lg font-semibold w-full text-center">
                      {roomName}
                    </h2>
                    <Rate
                      tooltips={desc}
                      onChange={setValueRate}
                      value={valueRate}
                    />
                  </div>
                  <form className="space-y-4">
                    <TextArea
                      placeholder="Mời bạn chia sẻ thêm cảm nhận..."
                      className="!min-h-32 dark:bg-slate-400"
                      onChange={(e) => {
                        setTextAreaReview(e.target.value);
                      }}
                      value={textAreaReview}
                    />
                    <ButtonPrimary
                      className={"w-full py-6"}
                      onClick={handleSendReview}
                    >
                      Gửi đánh giá
                    </ButtonPrimary>
                  </form>
                </div>
              </Modal>
            </>
          ) : (
            <ButtonOutLine
              onClick={() => {
                console.log("test");
              }}
              className={
                "border-[#222] font-semibold px-6 !py-6 text-[#222] hover:!bg-gray-100 hover:shadow-md transition-all duration-200"
              }
            >
              <Link to={`${pathDefault.AuthPage}?type=signin`}>
                Đăng nhập để viết đánh giá
              </Link>
            </ButtonOutLine>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentRoom;
