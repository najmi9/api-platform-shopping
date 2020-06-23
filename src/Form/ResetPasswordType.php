<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Validator\Constraints\EqualTo;
use Symfony\Component\Validator\Constraints\Length;

class ResetPasswordType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('password', PasswordType::class,[
                "constraints"=>[
              new Length (["min"=>6, "minMessage"=>"le minimum de caractère doit être  > à 6 !"])
            ]
            ])
            ->add('passwordConfirm', PasswordType::class,[
            "constraints"=>[
              new Length (["min"=>6, "minMessage"=>"le minimum de caractère doit être  > à 6 !"])
            ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
