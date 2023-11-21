import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../interface/interface";
import swal from "sweetalert";
interface ISelectMembers {
  name?: string;
  members: IUser[];
}
const initialState: ISelectMembers = {
  name: "",
  members: []
};

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    userAdd: (state: ISelectMembers, action: PayloadAction<IUser>) => {
      const userToAdd = action.payload;
      const isUserList = state.members.some(
        (user: IUser) => user._id === userToAdd._id
      );
      if (!isUserList) {
        state.members.push({ ...action.payload });
      } else {
        swal(`Oh! This User is already added to wishlist`, {
          icon: "warning"
        });
      }
    },
    userRemoved: (state: ISelectMembers, action: PayloadAction<IUser>) => {
      state.members = state.members.filter(
        (u: IUser) => u._id !== action.payload._id
      );
    },
    clearTeam: (state: ISelectMembers) => {
      state.name = "";
      state.members = [];
    }
  }
});

export const { userAdd, clearTeam, userRemoved } =
  userListSlice.actions;
export default userListSlice.reducer;
