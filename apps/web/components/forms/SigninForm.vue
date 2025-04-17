<script setup lang="ts">
import * as zod from 'zod';
import { Lock, Mail } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

export type SubmitFormDataType = zod.infer<typeof signinSchemaValidator>;
export type Props = {
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  disabled: false,
});
const emits = defineEmits<{
  (event: 'submit:form', data: SubmitFormDataType): void;
}>();

const signinSchemaValidator = zod.object({
  email: zod.string().email({ message: 'Invalid email' }),
  password: zod.string().nonempty({ message: 'Required field' }),
});

const formSchema = toTypedSchema(signinSchemaValidator);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
  },
});

const onSubmit = handleSubmit((values) => emits('submit:form', values));
</script>

<template>
  <form class="grid w-[300px] gap-6" @submit="onSubmit">
    <span class="hidden text-4xl font-bold lg:block">Sign In</span>
    <div class="text-center lg:hidden">
      <h1 class="text-2xl font-bold">Welcome back</h1>
      <p class="text-balance text-muted-foreground">
        Login to your Ez Shortener account
      </p>
    </div>
    <div class="flex flex-col gap-4">
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
    </div>
    <div class="flex flex-col gap-4">
      <Button type="submit" class="w-full" size="lg" :disabled>
        Sign In
      </Button>
      <div class="text-center text-sm">
        New here?
        <NuxtLink to="/signup" class="font-medium">
          Create an Account
        </NuxtLink>
      </div>
    </div>
  </form>
</template>
