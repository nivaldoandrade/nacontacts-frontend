import Input from '../../components/Input';
import { PageHeader } from '../../components/PageHeader';
import Select from '../../components/Select';

export function NewContact() {
  return (
    <>
      <PageHeader title="Novo contato" />
      <Input type="text" placeholder="Nome" />
      <Select>
        <option value="1">Instagram</option>
        <option value="2">Twitter</option>
        <option value="3">Facebook</option>
      </Select>
    </>
  );
}
