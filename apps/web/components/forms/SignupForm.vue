<script setup lang="ts">
import * as zod from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

export type SubmitFormDataType = zod.infer<typeof signupSchemaValidator>;

const emits = defineEmits<{
  (event: 'submit:form', data: SubmitFormDataType): void;
}>();

const signupSchemaValidator = zod
  .object({
    username: zod.string().min(3).max(32),
    email: zod.string().email().nonempty(),
    password: zod
      .string()
      .min(8)
      .max(32)
      .regex(/[a-z]/)
      .regex(/[A-Z]/)
      .regex(/\d/)
      .regex(/[\W_]/),
    passwordConfirmation: zod.string().nonempty(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'field must match (password)',
    path: ['passwordConfirmation'],
  });

const formSchema = toTypedSchema(signupSchemaValidator);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  },
});

const onSubmit = handleSubmit((values) => emits('submit:form', values));
</script>

<template>
  <Card class="overflow-hidden">
    <CardContent class="grid p-0 md:grid-cols-2">
      <div class="relative hidden bg-muted md:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <form class="p-6 md:p-8" @submit="onSubmit">
        <div class="flex flex-col gap-4">
          <div class="text-center">
            <h1 class="text-2xl font-bold">Let's register</h1>
            <p class="text-balance text-muted-foreground">
              Fill in your details below to sign up
            </p>
          </div>
          <div class="flex flex-col gap-4 h-[350px]">
            <FormField v-slot="{ componentField }" name="username">
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input id="username" type="text" v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input id="email" type="email" v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    v-bind="componentField"
                  />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="passwordConfirmation">
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input
                    id="passwordConfirmation"
                    type="password"
                    v-bind="componentField"
                  />
                </FormControl>
              </FormItem>
            </FormField>
          </div>
          <div class="flex flex-col gap-4">
            <Button type="submit" class="w-full"> Create account </Button>
            <div class="text-center text-sm">
              Already have an accoun?
              <NuxtLink to="/auth/signin" class="underline underline-offset-4">
                Sign in
              </NuxtLink>
            </div>
          </div>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
