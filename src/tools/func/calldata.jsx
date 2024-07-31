import supabase from "../config/connect";
import { shopList } from "../slice/shopSlice";
import { userList } from "../slice/usersSlice";
import store from "../store/shopStore";

export const shopData = async () => {
    const { data, error } = await supabase.from('MewsShopData').select();
    if (error) {
        console.log('Supabase error:', error)
    } else {
        store.dispatch(shopList(data));
    }
}

export const userData = async () => {
    const { data, error } = await supabase.from('Users').select();
    if (error) {
        console.log('Supabase error:', error)
    } else {
        store.dispatch(userList(data));
    }
}