import XX1 from '../../public/api/XX1.json';
import XX2 from '../../public/api/XX2.json';
import XX3 from '../../public/api/XX3.json';

export function survey(id) {
  switch (id) {
    case 'XX1':
      return XX1
    case 'XX2':
      return XX2
    case 'XX3':
      return XX3
    default:
      return []
  }
}