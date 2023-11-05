import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../redux/features/auth.slice";
import { DashboardLayout, FormPassword } from "../../components";
import { errorPopUp } from "../../helpers/toastify";
import { useForm } from "react-hook-form";

const updateDetails = ({ id }) => {
  const { updatePasswordLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = data;

    if (newPassword === oldPassword) return errorPopUp({ msg: "Change password" });
    if (newPassword !== confirmPassword) return errorPopUp({ msg: "Passwords do not match" });
    if (newPassword == confirmPassword) {
      const payload = { oldPassword, newPassword, confirmPassword };

      dispatch(updatePassword({ payload, reset }));
    }
  };

  return (
    <DashboardLayout name="Password">
      <div className="w-[80%] mx-auto text-left bg-white rounded-xl h-full border-[0.5px] px-4 md:px-6 py-4 mt-2 text-[#222222]">
        <h2 className="font-semibold capitalize text-sm md:text-base mb-4">Update Password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormPassword
              register={register}
              label="Current Password"
              name="oldPassword"
              errors={errors}
              errorMessage="Please add a password"
            />
            <FormPassword
              register={register}
              label="New Password"
              name="newPassword"
              errors={errors}
              errorMessage="Please add a password"
            />
            <FormPassword
              register={register}
              label="Confirm New Password"
              name="confirmPassword"
              errors={errors}
              errorMessage="Please add a password"
            />
          </div>
          <button className={`${updatePasswordLoading && "loading"} btn btn-block btn-primary mt-8`} type="submit">
            {updatePasswordLoading ? "" : "SAVE"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default updateDetails;
