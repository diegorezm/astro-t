import './_astro_actions_-Y9wXaef.mjs';
import * as z from 'zod';
import { z as z$1 } from 'zod';
import { A as AstroError, q as ActionCalledFromServerError } from './astro/assets-service_Dh1T9ksQ.mjs';
import { c as callSafely, a as ActionError, b as ActionInputError } from './shared_BKd_FIVp.mjs';

function defineAction({
  accept,
  input: inputSchema,
  handler
}) {
  const serverHandler = accept === "form" ? getFormServerHandler(handler, inputSchema) : getJsonServerHandler(handler, inputSchema);
  async function safeServerHandler(unparsedInput) {
    if (typeof this === "function") {
      throw new AstroError(ActionCalledFromServerError);
    }
    return callSafely(() => serverHandler(unparsedInput, this));
  }
  Object.assign(safeServerHandler, {
    orThrow(unparsedInput) {
      if (typeof this === "function") {
        throw new AstroError(ActionCalledFromServerError);
      }
      return serverHandler(unparsedInput, this);
    }
  });
  return safeServerHandler;
}
function getFormServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (!(unparsedInput instanceof FormData)) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts FormData."
      });
    }
    if (!inputSchema) return await handler(unparsedInput, context);
    const baseSchema = unwrapBaseObjectSchema(inputSchema, unparsedInput);
    const parsed = await inputSchema.safeParseAsync(
      baseSchema instanceof z$1.ZodObject ? formDataToObject(unparsedInput, baseSchema) : unparsedInput
    );
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function getJsonServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (unparsedInput instanceof FormData) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts JSON."
      });
    }
    if (!inputSchema) return await handler(unparsedInput, context);
    const parsed = await inputSchema.safeParseAsync(unparsedInput);
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function formDataToObject(formData, schema) {
  const obj = schema._def.unknownKeys === "passthrough" ? Object.fromEntries(formData.entries()) : {};
  for (const [key, baseValidator] of Object.entries(schema.shape)) {
    let validator = baseValidator;
    while (validator instanceof z$1.ZodOptional || validator instanceof z$1.ZodNullable || validator instanceof z$1.ZodDefault) {
      if (validator instanceof z$1.ZodDefault && !formData.has(key)) {
        obj[key] = validator._def.defaultValue();
      }
      validator = validator._def.innerType;
    }
    if (!formData.has(key) && key in obj) {
      continue;
    } else if (validator instanceof z$1.ZodBoolean) {
      const val = formData.get(key);
      obj[key] = val === "true" ? true : val === "false" ? false : formData.has(key);
    } else if (validator instanceof z$1.ZodArray) {
      obj[key] = handleFormDataGetAll(key, formData, validator);
    } else {
      obj[key] = handleFormDataGet(key, formData, validator, baseValidator);
    }
  }
  return obj;
}
function handleFormDataGetAll(key, formData, validator) {
  const entries = Array.from(formData.getAll(key));
  const elementValidator = validator._def.type;
  if (elementValidator instanceof z$1.ZodNumber) {
    return entries.map(Number);
  } else if (elementValidator instanceof z$1.ZodBoolean) {
    return entries.map(Boolean);
  }
  return entries;
}
function handleFormDataGet(key, formData, validator, baseValidator) {
  const value = formData.get(key);
  if (!value) {
    return baseValidator instanceof z$1.ZodOptional ? void 0 : null;
  }
  return validator instanceof z$1.ZodNumber ? Number(value) : value;
}
function unwrapBaseObjectSchema(schema, unparsedInput) {
  while (schema instanceof z$1.ZodEffects || schema instanceof z$1.ZodPipeline) {
    if (schema instanceof z$1.ZodEffects) {
      schema = schema._def.schema;
    }
    if (schema instanceof z$1.ZodPipeline) {
      schema = schema._def.in;
    }
  }
  if (schema instanceof z$1.ZodDiscriminatedUnion) {
    const typeKey = schema._def.discriminator;
    const typeValue = unparsedInput.get(typeKey);
    if (typeof typeValue !== "string") return schema;
    const objSchema = schema._def.optionsMap.get(typeValue);
    if (!objSchema) return schema;
    return objSchema;
  }
  return schema;
}

const apiUrl = "https://6705e9d9031fd46a831159cc.mockapi.io/api/v1";
const server = {
  getEmployees: defineAction({
    handler: async () => {
      const response = await fetch(`${apiUrl}/employees`);
      const employees = await response.json();
      return employees;
    }
  }),
  getEmployee: defineAction({
    input: z.object({
      id: z.string()
    }),
    handler: async (input) => {
      const response = await fetch(`${apiUrl}/employees/${input.id}`);
      const employee = await response.json();
      return employee;
    }
  }),
  createEmployee: defineAction({
    input: z.object({
      name: z.string(),
      image: z.string(),
      company: z.string(),
      job: z.string()
    }),
    handler: async (input) => {
      const response = await fetch(`${apiUrl}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      });
      const employee = await response.json();
      return employee;
    }
  }),
  updateEmployee: defineAction({
    input: z.object({
      id: z.string(),
      name: z.string(),
      image: z.string(),
      company: z.string(),
      job: z.string()
    }),
    handler: async (input) => {
      const response = await fetch(`${apiUrl}/employees/${input.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      });
      const employee = await response.json();
      return employee;
    }
  }),
  deleteEmployee: defineAction({
    input: z.object({
      id: z.string()
    }),
    handler: async (input) => {
      await fetch(`${apiUrl}/employees/${input.id}`, {
        method: "DELETE"
      });
      return { success: true };
    }
  })
};

export { server };
