import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { patchGroupInfo } from "@/lib/apis/group";
import { showToast } from "@/lib/show-toast";
import XIcon from "@/public/icons/x.svg";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface ModalTeamNameEditProps {
  close: () => void;
  groupId: string;
  currentTeamName: string;
}

const ModalTeamNameEdit = ({
  close,
  groupId,
  currentTeamName,
}: ModalTeamNameEditProps) => {
  const [teamName, setTeamName] = useState(currentTeamName);
  const router = useRouter();
  const handleButtonClick = async () => {
    try {
      await patchGroupInfo({
        groupId: groupId,
        name: teamName,
      });
      showToast("success", <p>{teamName}으로 수정되었습니다.</p>);
      router.refresh();
      close();
    } catch (error) {
      showToast("error", <p>팀 명 수정에 실패하였습니다.</p>);
      console.error(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="relative flex h-[187px] flex-col items-center justify-center gap-[8px]">
        <button className="absolute right-0 top-0" onClick={close}>
          <XIcon width={24} height={24} />
        </button>
        <div className="flex h-[155px] w-[280px] flex-col justify-center gap-[24px]">
          <div className="flex flex-col justify-center gap-[16px] pt-[8px]">
            <Modal.Title>팀 이름</Modal.Title>
            <input
              className="rounded-xl border border-border-primary border-opacity-10 bg-background-secondary px-4 py-[13.5px] text-base font-normal text-text-primary placeholder:text-sm placeholder:font-normal placeholder:text-text-default focus:border-2 focus:outline-none"
              value={teamName}
              onChange={handleInputChange}
            />
          </div>

          <Button
            btnSize="large"
            btnStyle="solid"
            onClick={handleButtonClick}
            disabled={!teamName.trim()}
            type="button"
          >
            수정하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalTeamNameEdit;