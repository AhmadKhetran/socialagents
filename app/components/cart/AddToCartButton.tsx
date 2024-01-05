// 'use client';

// export interface Cart {
//     product_ids: string[];
//     quantity: number[];
// }

// const AddToCart = ({ productId }: { productId: number }) => {
//     // const queryClient = useQueryClient();

//     // const {} = useMutation({
//     //   mutationFn: async () => {
//     //     //prisma add
//     //   },
//     //   onSuccess: () => {
//     //     toast.success('Added to cart successfully')
//     //     query
//     //   }
//     // })
//     // const {data, isLoading, isError, error} = useQuery({
//     //   queryKey: ["userCartAdd"],
//     //   queryFn: async () => {
//     //     const { data } = await axios.post("/api/cart/addToCart", {productId});
//     //     return data.data as Cart;
//     //   }
//     // });

//     // if(isLoading){
//     //   return <Loading />
//     // }

//     // if(isError){
//     //   return <div>An error has occured {error.message} </div>
//     // }

//     return (
//         <div>
//             <button onClick={() => console.log('Click')}>Add to Cart</button>
//         </div>
//     );
// };

// export default AddToCart;
