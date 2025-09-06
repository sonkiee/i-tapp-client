import { Wrapper } from "@/components/wrapper";

export default function Notification() {
  return (
    <Wrapper className="flex flex-col gap-10">
      <h6 className=" text-h5">Notifications</h6>
      <div>
        <p className=" text-base font-bold mb-3">Most recent</p>
        <div>
          <div className="flex flex-col gap-2">
            <p>You've just been accepted by Chenotech Nigeria Limited</p>
            <p className="text-primary font-bold">8:51 AM</p>
          </div>
        </div>
      </div>

      <div>
        <p className=" text-base font-bold  mb-3">Earlier</p>
        <div>
          <div className="flex flex-col gap-2">
            <p>You've just been accepted by Chenotech Nigeria Limited</p>
            <p className="text-primary font-bold">8:51 AM</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
