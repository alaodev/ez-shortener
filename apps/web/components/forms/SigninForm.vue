<script setup lang="ts">
import * as zod from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

export type SubmitFormDataType = zod.infer<typeof signinSchemaValidator>;

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
  <Card>
    <CardHeader class="text-center">
      <CardTitle class="text-xl"> Welcome back </CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <div class="grid gap-6">
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
                <Input id="password" type="password" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full"> Login </Button>
          <div class="text-center text-sm">
            Don't have an account?
            <NuxtLink to="/auth/signup" class="underline underline-offset-4">
              Sign up
            </NuxtLink>
          </div>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
