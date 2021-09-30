export default (
  createApp,
  store,
  firebaseAuth,
  db,
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  where,
  signOut
) =>
  createApp({
    store,

    title: "",
    description: "",

    get userEmail() {
      return this.store.user?.email;
    },

    fetchPosts() {
      const q = query(
        collection(db, "posts"),
        where("userId", "==", this.store.user?.uid)
      );

      onSnapshot(q, (querySnapshot) => {
        console.log(querySnapshot);
        const posts = [];
        querySnapshot.forEach((doc) =>
          posts.push({ ...doc.data(), id: doc.id })
        );
        this.store.posts = posts;
      });
    },

    addNewPost() {
      addDoc(collection(db, "posts"), {
        title: this.title,
        description: this.description,
        userId: this.store.user?.uid,
      })
        .then((docRef) => {
          console.log(docRef);
          this.title = "";
          this.description = "";
        })
        .catch((err) => console.log(err));
    },

    deletePost(id) {
      deleteDoc(doc(db, "posts", id));
    },

    logout() {
      signOut(firebaseAuth);
    },
  }).mount("#dashboard");
