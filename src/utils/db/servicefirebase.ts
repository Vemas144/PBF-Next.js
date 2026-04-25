import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc,
  Query,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

export async function retrieveData(
  collectionName: string, 
  filters?: Array<{field: string, operator: string, value: any}>
): Promise<any[]> {
  let q: Query = collection(db, collectionName);
  
  if (filters?.length) {
    filters.forEach((filter) => {
      q = query(q, where(filter.field, filter.operator as any, filter.value)) as Query;
    });
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}


export async function updateDocument(collectionName: string, docId: string, data: any) {
  try {
    await updateDoc(doc(db, collectionName, docId), data);
    return { status: true, message: "Updated successfully" };
  } catch (error: any) {
    return { status: false, message: error.message };
  }
}



// SignIn - cari user by email
export async function signIn(email: string) {
  const users = await retrieveData("users", [
    { field: "email", operator: "==", value: email }
  ]);
  return users[0] || null;
}

// SignUp - email/password (tetap pakai callback)
export async function signUp(
  userData: { email: string; fullname: string; password: string },
  callback: Function
) {
  const existingUsers = await retrieveData("users", [
    { field: "email", operator: "==", value: userData.email }
  ]);

  if (existingUsers.length > 0) {
    callback({ status: "error", message: "Email already exists" });
    return;
  }

  try {
    const hashedData = {
      ...userData,
      password: await bcrypt.hash(userData.password, 10),
      role: "member"
    };
    await addDoc(collection(db, "users"), hashedData);
    callback({ status: "success", message: "User registered successfully" });
  } catch (error: any) {
    callback({ status: "error", message: error.message });
  }
}


export async function upsertUser(
  userData: { email: string; fullname?: string; image?: string; type?: string },
  callback: Function
) {
  try {
    const existingUsers = await retrieveData("users", [
      { field: "email", operator: "==", value: userData.email }
    ]);

    if (existingUsers.length > 0) {
      // UPDATE - keep existing role!
      const updatedData = { 
        ...userData, 
        role: existingUsers[0].role || "member"
      };
      await updateDocument("users", existingUsers[0].id, updatedData);
      
      callback({
        status: true,
        message: "User logged in successfully",
        data: updatedData,
      });
    } else {
      // CREATE new user
      const newData = { ...userData, role: "member" };
      await addDoc(collection(db, "users"), newData);
      
      callback({
        status: true,
        message: "User created successfully",
        data: newData,
      });
    }
  } catch (error: any) {
    callback({ status: false, message: error.message });
  }
}


export async function signInWithGoogle(userData: any, callback: any) {
  upsertUser(userData, callback); 
}

export async function signInWithOAuth(userData: any, callback: any) {
  upsertUser(userData, callback); 
}

export async function updateUserRole(userId: string, newRole: string) {
  return updateDocument("users", userId, { role: newRole });
}