<script setup lang="ts">
import * as zod from 'zod';
import { Lock, LockKeyhole, Mail, SquareUser } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

export type SubmitFormDataType = zod.infer<typeof signupSchemaValidator>;
export type Props = {
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  disabled: false,
});
const emits = defineEmits<{
  (event: 'submit:form', data: SubmitFormDataType): void;
}>();

const signupSchemaValidator = zod
  .object({
    username: zod
      .string()
      .min(3, { message: 'Username must contain at least 3 characters' })
      .max(32, { message: 'Username must contain at most 32 character(s)' }),
    email: zod
      .string()
      .email({ message: 'Invalid email' })
      .nonempty({ message: 'Required field' }),
    password: zod
      .string()
      .min(8, { message: 'Password must contain at least 8 characters' })
      .max(32, { message: 'Password must contain at most 32 character(s)' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least 1 lowercase character',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least 1 uppercase character',
      })
      .regex(/\d/, {
        message: 'Password must contain at least 1 numeric character',
      })
      .regex(/[\W_]/, {
        message: 'Password must contain at least 1 special character',
      }),
    passwordConfirmation: zod.string().nonempty({ message: 'Required field' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
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
  <form class="grid w-[300px] gap-6" @submit="onSubmit">
    <span class="hidden text-4xl font-bold lg:block">Sign Up</span>
    <div class="text-center lg:hidden">
      <h1 class="text-2xl font-bold">Let's register</h1>
      <p class="text-balance text-muted-foreground">
        Fill in your details below to sign up
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem v-auto-animate>
          <FormControl>
            <div class="relative w-full max-w-sm items-center">
              <Input
                id="username"
                type="text"
                class="pl-10"
                placeholder="Username"
                v-bind="componentField"
                :disabled
              />
              <span
                class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
              >
                <SquareUser
                  :stroke-width="0.5"
                  class="size-6 text-muted-foreground"
                />
              </span>
            </div>
            <FormMessage />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem v-auto-animate>
          <FormControl>
            <div class="relative w-full max-w-sm items-center">
              <Input
                id="email"
                type="email"
                class="pl-10"
                placeholder="Email"
                v-bind="componentField"
                :disabled
              />

              <span
                class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
              >
                <Mail
                  :stroke-width="0.5"
                  class="size-6 text-muted-foreground"
                />
              </span>
            </div>
            <FormMessage />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem v-auto-animate>
          <FormControl>
            <div class="relative w-full max-w-sm items-center">
              <Input
                id="password"
                type="password"
                class="pl-10"
                placeholder="Password"
                v-bind="componentField"
                :disabled
              />

              <span
                class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
              >
                <Lock
                  :stroke-width="0.5"
                  class="size-6 text-muted-foreground"
                />
              </span>
            </div>
            <FormMessage />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="passwordConfirmation">
        <FormItem v-auto-animate>
          <FormControl>
            <div class="relative w-full max-w-sm items-center">
              <Input
                id="passwordConfirmation"
                type="password"
                class="pl-10"
                placeholder="Repeat Password"
                v-bind="componentField"
                :disabled
              />

              <span
                class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
              >
                <LockKeyhole
                  :stroke-width="0.5"
                  class="size-6 text-muted-foreground"
                />
              </span>
            </div>
            <FormMessage />
          </FormControl>
        </FormItem>
      </FormField>
    </div>
    <div class="flex flex-col gap-4">
      <Button type="submit" class="w-full" size="lg" :disabled>
        Create an Account
      </Button>
      <div class="text-center text-sm">
        Already have an account?
        <NuxtLink to="/" class="font-medium"> Sign In </NuxtLink>
      </div>
    </div>
  </form>
</template>
