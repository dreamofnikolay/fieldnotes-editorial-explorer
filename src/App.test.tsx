import {beforeEach,describe,expect,it,vi} from "vitest";
import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import {getArticles} from "./services/articleService";

vi.mock("./services/articleService",()=>({getArticles:vi.fn()}));
const mockedGetArticles=vi.mocked(getArticles);
const fixture=[
 {id:"a",title:"Accessible interface patterns",excerpt:"Inclusive design notes",topic:"Design" as const,author:"Taylor Reed",publishedAt:"2025-02-01",readMinutes:5},
 {id:"b",title:"Reliable API boundaries",excerpt:"Maintainable data access",topic:"Engineering" as const,author:"Morgan Lee",publishedAt:"2025-01-01",readMinutes:8}
];

describe("Fieldnotes explorer",()=>{
 beforeEach(()=>{mockedGetArticles.mockReset();mockedGetArticles.mockResolvedValue(fixture);});
 it("renders loaded articles",async()=>{
  render(<App/>);
  expect(await screen.findByRole("heading",{name:"Accessible interface patterns"})).toBeInTheDocument();
  expect(screen.getByRole("heading",{name:"Reliable API boundaries"})).toBeInTheDocument();
 });
 it("filters by topic",async()=>{
  const user=userEvent.setup();render(<App/>);
  await screen.findByRole("heading",{name:"Accessible interface patterns"});
  await user.selectOptions(screen.getByLabelText("Filter by topic"),"Engineering");
  expect(screen.getByRole("heading",{name:"Reliable API boundaries"})).toBeInTheDocument();
  expect(screen.queryByRole("heading",{name:"Accessible interface patterns"})).not.toBeInTheDocument();
 });
 it("shows an empty state for unmatched search",async()=>{
  const user=userEvent.setup();render(<App/>);
  await screen.findByRole("heading",{name:"Accessible interface patterns"});
  await user.type(screen.getByRole("searchbox",{name:"Search stories"}),"nothing matches");
  expect(await screen.findByText("No stories found.")).toBeInTheDocument();
 });
});