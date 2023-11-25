import { Key, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";

function Images({ data3 }: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [imgModal, setImgModal] = useState<string>("");
  const handleOpen = (path: string) => {
    setImgModal(path);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {data3?.backdrops?.length !== 0 && (
        <div className="flex flex-col mx-auto justify-between text-white mt-8  gap-3 ">
          <div className="sm:w-8/12 w-9/12  flex  mx-auto">
            <h2 className="font-semibold sm:text-2xl text-xl decoration-1 ">
              Images
            </h2>
            <div></div>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-6 justify-center">
            {data3?.backdrops
              ?.slice(0, 9)
              .map((e: { file_path: string }, i: Key | null | undefined) => {
                return (
                  <div
                    style={{ width: "200rm", height: "100rm" }}
                    className="img-film_backdrop sm:w-1/4 rounded-md   w-8/12 cursor-zoom-in overflow-hidden bg-black"
                    key={i}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0.4 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <img
                        className="hover:scale-105 trans bg-gray-400"
                        onClick={() => handleOpen(e?.file_path)}
                        src={`https://image.tmdb.org/t/p/w500/${e?.file_path}`}
                        alt=""
                      />
                    </motion.div>
                  </div>
                );
              })}
          </div>
          <Modal
            className="flex justify-center items-center "
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="flex  justify-center mx-auto sm:w-8/12 w-11/12 outline-none border border-black rounded-sm  ">
              <div className="bg_rating_bad w-full ">
                <img
                  className=" mx-auto "
                  src={`https://image.tmdb.org/t/p/original//${imgModal}`}
                  alt=""
                />
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}

export default Images;
