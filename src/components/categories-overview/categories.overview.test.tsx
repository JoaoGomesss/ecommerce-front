import * as firestore from "firebase/firestore";
import { renderWithRedux } from "../../helpers/test.helpers";
import CategoriesOverview from "./categories.overview.component";
import Category from "../../types/category.types";

jest.mock("firebase/firestore");

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "test@example.com" },
  })),
  GoogleAuthProvider: jest.fn(),
  signOut: jest.fn(),
}));

describe("Categories Overview", () => {
  it("should fetch and show categories", async () => {
    const mockedFirestore = firestore as any;
    mockedFirestore.getDocs.mockImplementation(async () => [
      {
        data(): Category {
          return {
            id: "1",
            displayName: "lorem ipsum",
            imageUrl: "image_url",
            name: "lorem ipsum",
            products: [
              { id: "1", price: 10, imageUrl: "image_url", name: "boné" },
            ],
          };
        },
      },
    ]);

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {},
    }));

    const { getByText, findByText } = renderWithRedux(
      <CategoriesOverview />,
      {},
    );

    await findByText(/boné/i);
    getByText("lorem ipsum");
    getByText("R$10");
  });
});
