<script setup lang="ts">
import * as zod from 'zod';
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
  email: zod.string().email().nonempty(),
  password: zod.string().nonempty(),
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
  <Card class="overflow-hidden">
    <CardContent class="grid p-0 md:grid-cols-2">
      <form class="p-6 md:p-8" @submit="onSubmit">
        <div class="flex flex-col gap-4">
          <div class="text-center">
            <h1 class="text-2xl font-bold">Welcome back</h1>
            <p class="text-balance text-muted-foreground">
              Login to your Ez Shortener account
            </p>
          </div>
          <div class="flex flex-col gap-4 h-[350px]">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    v-bind="componentField"
                    :disabled
                  />
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
                    :disabled
                  />
                </FormControl>
              </FormItem>
            </FormField>
          </div>
          <div class="flex flex-col gap-4">
            <Button type="submit" class="w-full" :disabled> Login </Button>
            <div class="text-center text-sm">
              Don&apos;t have an account?
              <NuxtLink to="/signup" class="underline underline-offset-4">
                Sign up
              </NuxtLink>
            </div>
          </div>
        </div>
      </form>
      <div class="relative hidden bg-muted md:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </CardContent>
  </Card>
</template>
