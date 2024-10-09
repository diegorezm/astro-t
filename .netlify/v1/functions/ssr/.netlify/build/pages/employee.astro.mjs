import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_ChqK_OFe.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent, B as Button, d as cn, $ as $$Layout } from '../chunks/card_7PJwbnJ5.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { a as actions } from '../chunks/_astro_actions_-Y9wXaef.mjs';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { create } from 'zustand';
import { toast } from 'sonner';
import { L as Label, I as Input } from '../chunks/label_D-csBqcf.mjs';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { cva } from 'class-variance-authority';
import { Plus } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const useOpenUpdateEmployeeSheet = create((set) => ({
  open: false,
  employee: null,
  onOpen: (employee) => set({ open: true, employee }),
  onClose: () => set({ open: false, employee: null })
}));

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Date(dateString).toLocaleDateString(void 0, options);
};
const EmployeeCard = ({ employee }) => {
  const { onOpen } = useOpenUpdateEmployeeSheet();
  const onEdit = (employee2) => {
    onOpen(employee2);
  };
  const onDelete = async (id) => {
    const { error } = await actions.deleteEmployee({ id });
    if (error) {
      toast.error(error.message ?? "Failed to delete employee");
    }
    toast.success("Employee deleted successfully!");
    setTimeout(() => location.reload(), 1e3);
  };
  return /* @__PURE__ */ jsxs(Card, { className: "w-full", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: employee.name }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-secondary-foreground", children: formatDate(employee.createdAt) })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("img", { src: employee.image, alt: employee.name, className: "w-24 h-24 rounded-full mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: employee.company }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-secondary-foreground", children: employee.job }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex space-x-2", children: [
        /* @__PURE__ */ jsx(Button, { onClick: () => onEdit(employee), children: "Edit" }),
        /* @__PURE__ */ jsx(Button, { variant: "destructive", onClick: () => onDelete(employee.id), children: "Delete" })
      ] })
    ] })
  ] });
};

const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);
  const setup = async () => {
    const { data, error } = await actions.getEmployees();
    if (error) {
      console.log(error);
      alert(error);
    } else {
      setEmployee(data);
    }
  };
  useEffect(() => {
    setup();
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full", children: employee.map((employee2) => /* @__PURE__ */ jsx(
    EmployeeCard,
    {
      employee: employee2
    },
    employee2.id
  )) });
};

const EmployeeForm = ({ onSubmit, defaultValues }) => {
  const [name, setName] = useState(defaultValues?.name || "");
  const [job, setJob] = useState(defaultValues?.job || "");
  const [company, setCompany] = useState(defaultValues?.company || "");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      job,
      company,
      image: "https://i.pravatar.cc/300"
    });
    setName("");
    setJob("");
    setCompany("");
  };
  return /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Name" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "text",
          placeholder: "Employee Name",
          value: name,
          onChange: (e) => setName(e.target.value),
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Job Title" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "text",
          placeholder: "Job Title",
          value: job,
          onChange: (e) => setJob(e.target.value),
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Company" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "text",
          placeholder: "Company Name",
          value: company,
          onChange: (e) => setCompany(e.target.value),
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "submit", children: "Add Employee" })
  ] });
};

const useOpenCreateEmployeeSheet = create((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false })
}));

const Sheet = SheetPrimitive.Root;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsx(Cross2Icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] }),
        children
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

const CreateEmployeeSheet = () => {
  const { open, onClose } = useOpenCreateEmployeeSheet();
  return /* @__PURE__ */ jsx(Sheet, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxs(SheetContent, { children: [
    /* @__PURE__ */ jsxs(SheetHeader, { children: [
      /* @__PURE__ */ jsx(SheetTitle, { children: "Create a employee record" }),
      /* @__PURE__ */ jsx(SheetDescription, { children: "Fill in the information below to create a new employee." })
    ] }),
    /* @__PURE__ */ jsx(EmployeeForm, { onSubmit: async (e) => {
      const { error } = await actions.createEmployee(e);
      if (error) {
        toast.error(error.message ?? "Failed to create employee");
        return;
      }
      toast.success("Employee created successfully");
      setTimeout(() => location.reload(), 1e3);
      onClose();
    } })
  ] }) });
};

const UpdateEmployeeSheet = () => {
  const { open, onClose, employee } = useOpenUpdateEmployeeSheet();
  if (open && !employee) {
    toast.error("Employee not found");
    onClose();
  }
  return /* @__PURE__ */ jsx(Sheet, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxs(SheetContent, { children: [
    /* @__PURE__ */ jsxs(SheetHeader, { children: [
      /* @__PURE__ */ jsx(SheetTitle, { children: "Update a employee record" }),
      /* @__PURE__ */ jsx(SheetDescription, { children: "Fill in the information below to update employee record." })
    ] }),
    /* @__PURE__ */ jsx(EmployeeForm, { defaultValues: employee, onSubmit: async (e) => {
      if (!employee) {
        toast.error("Employee not found");
        return;
      }
      const { error } = await actions.updateEmployee({
        id: employee.id,
        ...e
      });
      if (error) {
        toast.error(error.message ?? "Failed to update employee");
        return;
      }
      toast.success("Employee updated successfully");
      setTimeout(() => location.reload(), 1e3);
      onClose();
    } })
  ] }) });
};

const CreateEmployeeButton = () => {
  const { onOpen } = useOpenCreateEmployeeSheet();
  return /* @__PURE__ */ jsxs(Button, { onClick: onOpen, children: [
    "New Employee",
    /* @__PURE__ */ jsx(Plus, { className: "ml-2 size-4" })
  ] });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Employee App" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="flex flex-col items-center justfy-center w-full gap-4"> <h1 class="w-full text-left text-3xl font-bold">Employees Management</h1> <div class="flex justify-start w-full"> ${renderComponent($$result2, "CreateEmployeeButton", CreateEmployeeButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/diego/docs/code/tests/astro-t/src/pages/employee/_create-employee-button", "client:component-export": "CreateEmployeeButton" })} </div> ${renderComponent($$result2, "EmployeeList", EmployeeList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/diego/docs/code/tests/astro-t/src/pages/employee/_list", "client:component-export": "EmployeeList" })} ${renderComponent($$result2, "CreateEmployeeSheet", CreateEmployeeSheet, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/diego/docs/code/tests/astro-t/src/pages/employee/_create-employee-sheet", "client:component-export": "CreateEmployeeSheet" })} ${renderComponent($$result2, "UpdateEmployeeSheet", UpdateEmployeeSheet, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/diego/docs/code/tests/astro-t/src/pages/employee/_update-employee-sheet", "client:component-export": "UpdateEmployeeSheet" })} </section> ` })}`;
}, "/home/diego/docs/code/tests/astro-t/src/pages/employee/index.astro", void 0);

const $$file = "/home/diego/docs/code/tests/astro-t/src/pages/employee/index.astro";
const $$url = "/employee";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
